/* eslint-disable import/extensions */
import { iamServices } from '../services/index.services.js';
import { userServices } from '../services/index.services.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

export const allUsers = async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = 5;



};

export const sendMessage = async (req, res, next) => {
  res.send('Not Implemented yet');
};

export const profilePictureUpdate = async (req, res, next) => {
  res.send('Not Implemented yet');
};
