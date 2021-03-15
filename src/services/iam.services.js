/* eslint-disable import/extensions */
import User from '../models/user.models.js';

export const registration = async (userDTO) => {
  // something
  const { email } = { ...userDTO };
  return email;
};

export const login = async (userDTO) => {
  const { email } = { ...userDTO };
  return email;
};

export const findUserByEmail = async (userDTO) => {
  try {
    const userFound = await User.findOne({ email: userDTO });
    return userFound;
  } catch (err) {
    return err;
  }
};
