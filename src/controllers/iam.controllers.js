/* eslint-disable import/extensions */
import { iamServices } from '../services/index.services.js';
import logger from '../utils/logger.js';
// import { iamValidators } from '../utils/index.js';

// Generate the Hash password for security
export const generateHashPassword = async (password) => {
  const hashPassword = password + password;
  return hashPassword;
};

// Generate JWT Tokens
export const generateJwt = async (user) => {
  const jwtToken = user.name;
  return jwtToken;
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
 * @param profilePhoto      Image to save in S3
 */

export const registration = async (req, res, next) => {
  // something
  // let result = await iamService;
  let { name, email, password } = req.body;
  try {
    let user = await iamServices.findUserByEmail(email);
    console.log('typeof ', typeof user);
    logger.debug(`FindByEmail user : ${user?.email}`);
    if (user !== undefined) {
      throw new Error('User Already Exist');
    } else {
      user = await iamServices.registration(name, email, password);
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (userDTO) => {
  // something
  const { email } = { ...userDTO };
  return email;
};
