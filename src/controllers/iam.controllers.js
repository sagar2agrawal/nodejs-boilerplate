import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

/* eslint-disable import/extensions */
import * as iamServices from '../services/iam.services.js';
import * as awsServices from '../services/aws.services.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

/**
 * For registrating the user in the Database.
 * @api {post} v1/iam/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup IAM
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

    // Throwing Error if the user already exists
    if (user !== null) {
      throw new Error('User Already Exist');
    }

    // Getting hashed password and salt to store instead of plan password
    const { hashPassword, saltHex } = await iamServices.generateHashPassword(password);

    user = await iamServices.registration({
      ...req.body,
      salt: saltHex,
      password: hashPassword,
    });

    const authToken = iamServices.generateJwt(user);
    logger.debug(`Generated AuthToken ${authToken}`);

    // We will be making cookie secure by adding httponly, secure, expiry & domain etc
    if (user) {
      res.cookie('AuthToken', authToken, {
        httpOnly: true,
        secure: true,
      });
    }

    delete user.salt;
    delete user.password;

    res.json(user);
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
      throw new Error('Incorrect Password!');
    }

    // Generating the JWT token to be send via http cookie
    const authToken = iamServices.generateJwt(user);

    // We will be making cookie secure by adding httponly, secure, expiry & domain etc
    res.cookie('AuthToken', authToken, {
      httpOnly: true,
      secure: true,
    });

    // Making sure we don't send back password to the user
    delete user.salt;
    delete user.password;

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/*
  Need to store the image info in database
  Check if the image is already there, we need schedule delete old image
*/
export const profilePicPut = async (req, res, next) => {
  try {
    // const result = await awsServices.profilePicUpload(params);
    // logger.debug(result);
    logger.debug(req.file);

    const url = await awsServices.getSignedUrlForObject({
      bucket: req.file.bucket,
      key: req.file.key,
    });

    res.json(url);
  } catch (err) {
    next(err);
  }
};
