/* eslint-disable import/extensions */
import User from '../models/user.models.js';
import logger from '../utils/logger.js';

export const listAllUsers = async (listUsersDTO) => {
  const { page, pageSize } = listUsersDTO;

  const usersList = await User.find({}).skip((pageSize * page) - pageSize)
    .limit(pageSize);
  return usersList;
};

export const countAllUsers = async () => {
  const totalSearchResults = await User.find({}).estimatedDocumentCount();
  return totalSearchResults;
};

export const profilePictureUpdate = async (userDTO) => {
  try {
    const userFound = await User.findOne({ email: userDTO });
    return userFound;
  } catch (err) {
    return err;
  }
};
