import Router from 'express';
import iamRoutes from './iam.routes.js';

const indexRouter = Router();

indexRouter.use('/iam', iamRoutes);

export default indexRouter;
