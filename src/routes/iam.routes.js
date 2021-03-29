import { Router } from 'express';
import { celebrate } from 'celebrate';

import { iamValidators } from '../utils/index.js';
import { iamControllers } from '../controllers/index.controllers.js';

import * as awsServices from '../services/aws.services.js';

const iamRoutes = Router();

iamRoutes.get('/check', (req, res) => {
  res.send('hey');
});

// routes for registration of the user
iamRoutes.post('/register', celebrate(iamValidators.registraton), iamControllers.registration);

// updating the name of the user
// iamRoutes.patch('/update-name', celebrate(iamValidators.registraton), iamControllers.registration);

// logging in
iamRoutes.post('/login', celebrate(iamValidators.login), iamControllers.login);

/*
* upload update profile pic
* validation is done with multer inbuilt callback functions instead of joi
*/
iamRoutes.post('/profilepic', awsServices.uploadProfilePicRoute, iamControllers.profilePicPut);

export default iamRoutes;
