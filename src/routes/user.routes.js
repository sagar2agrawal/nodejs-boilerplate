import { Router } from 'express';
import { celebrate } from 'celebrate';
import authJWT from '../utils/middlewares/authJWT.middleware.js';

const userRoutes = Router();

userRoutes.get('/allusers', authJWT, (req, res) => {
  res.send('all Users');
});

export default userRoutes;
