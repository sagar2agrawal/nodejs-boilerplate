import winston from 'winston';
import config from '../config/index.js';

const logger = winston.createLogger({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [new winston.transports.Console({ colorize: true })],
});

export default logger;
