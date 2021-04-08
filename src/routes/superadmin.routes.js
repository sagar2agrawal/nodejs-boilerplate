import { Router } from 'express';
import { celebrate } from 'celebrate';

import authJWT from '../utils/middlewares/authJWT.middleware.js';
import isSuperAdmin from '../utils/middlewares/isSuperAdmin.middleware.js';

const superAdminRoutes = Router();

// routes for registration of the user
superAdminRoutes.get('/jobs-per-company', authJWT, isSuperAdmin);

export default superAdminRoutes;
