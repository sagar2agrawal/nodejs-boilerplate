import { Joi } from 'celebrate';

const allUsersSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
}).messages({
  'string.empty': '{#label} cant be empty!',
  'any.required': '{#label} is a required field',
});

export const allUser = { query: allUsersSchema };
