import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import * as iamServices from '../services/iam.services.js';
import * as awsServices from '../services/aws.services.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';
import * as iamControllers from './iam.controllers.js';

// helpers for test
import * as testDb from '../utils/test/testDBHandler.js';
import * as testInterceptors from '../utils/test/testInterceptors.js';
// mocking the modules, should have been first but because of hoisting it works
jest.mock('argon2');

jest.mock('../services/iam.services.js', () => ({
  findUserByEmail: jest.fn(),
  registration: jest.fn(),
  generateHashPassword: jest.fn(),
  generateJwt: jest.fn(),
  removeSensitiveInformation: jest.fn(),
}));

jest.mock('../utils/logger.js', () => ({
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
}));

// beforeAll(() => testDb.connectDatabase);

// afterAll(() => testDb.closeDatabase);

describe('testing login functionatily of IamController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    name: 'firstname lastname',
    email: 'useremail@gmail.com',
    password: 'somepass',
  };

  const req = testInterceptors.mockRequest({}, user);
  const res = testInterceptors.mockResponse();
  const next = testInterceptors.mockNext();

  jest.spyOn(iamServices, 'generateJwt').mockImplementation(() => 'someAuthToken');

  it('correct login', async () => {
    expect.assertions(1);

    iamServices.findUserByEmail.mockResolvedValueOnce(user);
    argon2.verify.mockResolvedValueOnce(true);

    await iamControllers.login(req, res, next);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('incorrect password', async () => {
    expect.assertions(2);
    iamServices.findUserByEmail.mockResolvedValueOnce(user);
    argon2.verify.mockResolvedValueOnce(false);

    await iamControllers.login(req, res, next);
    expect(res.json).not.toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error('Incorrect Password!'));
  });

  it('no email in database', async () => {
    expect.assertions(2);
    iamServices.findUserByEmail.mockResolvedValueOnce(null);
    argon2.verify.mockResolvedValueOnce(true);

    await iamControllers.login(req, res, next);
    expect(res.json).not.toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error('Email does not exist'));
  });
});

describe('testing registration functionatily of IamController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    name: 'firstname lastname',
    email: 'useremail@gmail.com',
    password: 'somepass',
  };

  const req = testInterceptors.mockRequest({}, user);
  const res = testInterceptors.mockResponse();
  const next = testInterceptors.mockNext();

  jest.spyOn(iamServices, 'generateJwt').mockImplementation(() => 'someAuthToken');
  iamServices.generateHashPassword.mockResolvedValue({ hashPassword: 'hp', saltHex: 'sh' });

  it('successful registration', async () => {
    expect.assertions(1);

    iamServices.findUserByEmail.mockResolvedValueOnce(null);
    iamServices.registration.mockResolvedValueOnce(user);
    argon2.verify.mockResolvedValueOnce(true);

    await iamControllers.registration(req, res, next);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('user already exists', async () => {
    expect.assertions(2);
    iamServices.findUserByEmail.mockResolvedValueOnce(user);
    iamServices.registration.mockResolvedValueOnce(user);

    await iamControllers.registration(req, res, next);
    expect(res.json).not.toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new Error('User Already Exist'));
  });
});
