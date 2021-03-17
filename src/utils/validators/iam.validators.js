import { Joi } from 'celebrate';

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
}).messages({
  'string.empty': '{#label} cant be empty!',
  'any.required': '{#label} is a required field',
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'string.empty': '{#label} cant be empty!',
  'any.required': '{#label} is a required field',
});

// const registrationSchema = Joi.object({
//   name: Joi.string().required().label('My Name'),
// }).messages({
//   'string.empty': '{#label} cant be empty!',
//   'any.required': '{#label} is a required field for this operation',
// });

export const registraton = { body: registrationSchema };
export const login = { body: loginSchema };
