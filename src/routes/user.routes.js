import { Router } from 'express';
import { celebrate } from 'celebrate';
import authJWT from '../utils/middlewares/authJWT.middleware.js';
import * as userControllers from '../controllers/user.controllers.js';
// import * as userValidators from '../utils/validators/user.validators.js';

const userRoutes = Router();

userRoutes.get('/allusers', authJWT, userControllers.allUsers);

export default userRoutes;
