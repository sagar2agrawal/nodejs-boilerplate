/* eslint-disable import/named */
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { iamValidators } from '../utils/index.js';
import { iamControllers } from '../controllers/index.controllers.js';
import { authJWT } from '../utils/index.js';

const iamRoutes = Router();

iamRoutes.get('/check', (req, res) => {
  res.send('hey');
});

// routes for registration of the user
iamRoutes.post('/register', celebrate(iamValidators.registraton), iamControllers.registration);

// updating the name of the user
iamRoutes.patch('/update-name', celebrate(iamValidators.registraton), iamControllers.registration);

// updating the name of the user
iamRoutes.get('/list-users', celebrate(iamValidators.registraton), iamControllers.registration);

// logging in
iamRoutes.post('/login', celebrate(iamValidators.login), iamControllers.login);

export default iamRoutes;
