import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

/* eslint-disable import/extensions */
import { iamServices } from '../services/index.services.js';
import * as awsServices from '../services/aws.services.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';
import * as iamControllers from './iam.controllers.js';

import * as testDb from '../utils/test/testDBHandler.js';
import * as testInterceptors from '../utils/test/testInterceptors.js';

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

  const req = testInterceptors.mockRequest({}, {});
  const res = testInterceptors.mockResponse();
  const next = testInterceptors.mockNext();

  // mocking the iamServices
  jest.mock(iamServices);

  iamServices.findUserByEmail.mockResolvedValue(user).mockResolvedValue(null);

  test('correct login', async () => {
    const result = await iamControllers.login(req, res, next);
    expect(result).toEqual(user);
  });

  // test('Incorrect login with no email in database', () => {

  // });

  // test('Incorrect login with wrong password', () => {

  // });
});
