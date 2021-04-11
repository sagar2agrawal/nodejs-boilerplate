import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

// importing internal modules
import User from '../models/user.models.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

export const registration = async (userRegistrationDTO) => {
  try {
    const user = await new User(userRegistrationDTO).save();
    return user;
  } catch (err) {
    return err;
  }
};

// export const login = async (userDTO) => {
//   const { email } = { ...userDTO };
//   return email;
// };

export const findUserByEmail = async (userDTO) => {
  // throw new Error('some error');
  try {
    const userFound = await User.findOne({ email: userDTO });
    return userFound;
  } catch (err) {
    return err;
  }
};

// Generate the Hash password for security
export const generateHashPassword = async (password) => {
  const salt = await randomBytes(32);
  const hashPassword = await argon2.hash(password, { salt });
  const saltHex = salt.toString('hex');
  return { hashPassword, saltHex };
};

/**
 *Generate JWT Tokens with user details that are requied for
 */
export const generateJwt = (user) => {
  logger.debug('Generating JWT Token');
  return jwt.sign({
    name: user.name,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
    userRole: user.role,
  }, config.AUTH.JWT_SECRET, { expiresIn: 36000 });
};

/**
 * remove sensitive information from the user return object for login, sign-up
 * @param {*} user
 * @returns {User} user object
 */
export const removeSensitiveInformation = (user) => {
  const safeUser = user;
  delete safeUser.password;
  delete safeUser.hash;
  return safeUser;
};
