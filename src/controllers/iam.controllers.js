import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

/* eslint-disable import/extensions */
import { iamServices } from '../services/index.services.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';
// import { iamValidators } from '../utils/index.js';

// Generate the Hash password for security
export const generateHashPassword = async (password) => {
  const salt = await randomBytes(32);
  const hashPassword = await argon2.hash(password, { salt });
  const saltHex = salt.toString('hex');
  return { hashPassword, saltHex };
};

// Generate JWT Tokens
export const generateJwt = (user) => {
  logger.debug('Generating JWT Token');
  return jwt.sign({
    name: user.name,
    email: user.email,
  }, config.AUTH.JWT_SECRET, { expiresIn: 36000 });
};

/**
 * For registrating the user in the Database.
 * @api {post} v1/auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 *
 * @param Email             Email | Email of the user
 * @param Password          String | The password
 * @param Name              String | Name of the user
 */

export const registration = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await iamServices.findUserByEmail(email);
    logger.debug(`FindByEmail user : ${user?.email} for registration`);
    if (user !== null) {
      throw new Error('User Already Exist');
    }

    // Getting hashed password and salt to store instead of plan password
    const { hashPassword, saltHex } = await generateHashPassword(password);

    user = await iamServices.registration({
      ...req.body,
      salt: saltHex,
      password: hashPassword,
    });

    const authToken = generateJwt(user);
    // We will be making cookie secure by adding httponly, secure, expiry & domain etc
    if (user) {
      res.cookie('AuthToken', authToken, {
        httpOnly: true,
        secure: true,
      });
    }

    delete user.salt;
    delete user.password;

    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await iamServices.findUserByEmail(email);
    logger.debug(`FindByEmail user : ${user?.email} for login`);
    if (user === null) {
      throw new Error('Email does not exist');
    }

    const correctPass = await argon2.verify(user.password, password);

    if (!correctPass) {
      throw new Error('Incorrect Password');
    }

    const authToken = generateJwt(user);
    // We will be making cookie secure by adding httponly, secure, expiry & domain etc
    if (user) {
      res.cookie('AuthToken', authToken, {
        httpOnly: true,
        secure: true,
      });
    }

    delete user.salt;
    delete user.password;

    res.send(user);
  } catch (error) {
    next(error);
  }
};
