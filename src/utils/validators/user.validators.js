import { Joi } from 'celebrate';

const getallUsersSchema = Joi.object({
  page: Joi.number().integer(),
});

export const getAllUsers = { query: getallUsersSchema };

