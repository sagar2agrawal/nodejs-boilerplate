import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config();

  if (envFound.error) {
    throw new Error('.env file not exists');
  }
}

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  LOG_LEVEL: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  API: {
    PREFIX: '/api/v1',
    VERSION: 'v1',
    RELEASE: '1.0.0',
  },
  SENTRY: {
    STATUS: process.env.SENTRY_STATUS || 'off',
    DSN: process.env.SENTRY_DSN,
  },
};

export default config;
