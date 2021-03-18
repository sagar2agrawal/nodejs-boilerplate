/* eslint-disable import/extensions */
import * as iamServices from '../services/index.services.js';
import * as userServices from '../services/user.services.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

export const allUsers = async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = 5;

  try {
    // Running the both things in Parallel to speed up
    const listResult = await Promise.all(([
      userServices.countAllUsers(),
      userServices.listAllUsers({ page, pageSize }),
    ]));

    const searchTotal = listResult[0];
    const userArray = listResult[1];
    const totalPages = Math.ceil(searchTotal / pageSize);

    const safeUserArrayList = userArray.map((item) => {
      const newUserObject = {
        name: item.name,
        email: item.email,
      };

      return newUserObject;
    });

    res.json({
      users: safeUserArrayList,
      currentPage: page,
      total: searchTotal,
      totalPages,
    });
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  res.send('Not Implemented yet');
};

export const profilePictureUpdate = async (req, res, next) => {
  res.send('Not Implemented yet');
};
