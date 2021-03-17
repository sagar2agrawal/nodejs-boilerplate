import Router from 'express';
import iamRoutes from './iam.routes.js';
import userRoutes from './user.routes.js';

const indexRouter = Router();

indexRouter.use('/iam', iamRoutes);
indexRouter.use('/user', userRoutes);

export default indexRouter;
