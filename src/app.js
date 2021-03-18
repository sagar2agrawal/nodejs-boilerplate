import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { isCelebrateError } from 'celebrate';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config/index.js';
import logger from './utils/logger.js';

// Importing all routes
import allRoutes from './routes/index.routes.js';

const app = express();

// Allowing the sentry to turn on or off for APM
if (config.SENTRY.STATUS === 'on') {
  Sentry.init({
    dsn: config.SENTRY.DSN,
    release: `${config.API.RELEASE}@${config.API.VERSION}`,
  });

  app.use(Sentry.Handlers.requestHandler());
}

// Allowing to print mongoose logs for development status
if (config.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

mongoose.connect(config.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .catch((error) => {
    console.log(error);
  });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use(cors());
app.use(helmet());

app.use(config.API.PREFIX, allRoutes);

app.get('/status', (req, res) => {
  res.send('Status Check');
});

if (config.SENTRY.STATUS === 'on') {
  app.use(Sentry.Handlers.errorHandler());
}
// app.use(errors());

// A middle for logging errors via winston
const logErrors = (err, req, res, next) => {
  logger.error(err.stack);
  next(err);
};

// using the logError middleware
app.use(logErrors);

app.use((err, req, res, next) => {
  let validationErrorMessage = '';
  res.status(err.status || 400);

  if (isCelebrateError(err)) {
    err.details.forEach((item) => {
      const allErrors = item.details.map((iteme) => iteme.message);
      validationErrorMessage = allErrors.join('\n');
    });

    logger.error(err);

    res.json({
      status: 'error',
      error: validationErrorMessage,
    });
  }

  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 400);

  res.json({
    status: 'error',
    error: err.message,
  });
});

export default app;
