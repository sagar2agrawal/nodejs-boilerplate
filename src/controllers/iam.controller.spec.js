import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

/* eslint-disable import/extensions */
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
}));

jest.mock('../utils/logger.js', () => ({
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
}));

// beforeAll(() => testDb.connectDatabase);

// afterAll(() => testDb.closeDatabase);

// beforeEach(() => {
//   initializeCityDatabase();
// });

// afterEach(() => {
//   clearCityDatabase();
// });

describe('Testing Login functionatily of IamController', () => {
  const user = {
    name: 'firstname lastname',
    email: 'useremail@gmail.com',
    password: 'somepass',
  };

  const req = testInterceptors.mockRequest({}, user);
  const res = testInterceptors.mockResponse();
  const next = testInterceptors.mockNext();

  // mocking the iamServices
  
  // iamServices.findUserByEmail = jest.fn();
  // argon2.verify = jest.fn();

  iamServices.findUserByEmail.mockResolvedValueOnce(user);
  argon2.verify.mockResolvedValueOnce(true);

  iamControllers.generateJwt = jest.fn(() => 'someAuthToken');

  test('correct login', async () => {
    await iamControllers.login(req, res, next);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  // test('Incorrect login with no email in database', () => {
    // expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  // });

  // test('Incorrect login with wrong password', () => {

  // });
});
