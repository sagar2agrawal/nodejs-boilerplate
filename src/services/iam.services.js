/* eslint-disable import/extensions */
import User from '../models/user.models.js';
import logger from '../utils/logger.js';

export const registration = async (userRegistrationDTO) => {
  const user = await new User(userRegistrationDTO).save();
  return user;
};

// export const login = async (userDTO) => {
//   const { email } = { ...userDTO };
//   return email;
// };

export const findUserByEmail = async (userDTO) => {
  try {
    const userFound = await User.findOne({ email: userDTO });
    return userFound;
  } catch (err) {
    return err;
  }
};
