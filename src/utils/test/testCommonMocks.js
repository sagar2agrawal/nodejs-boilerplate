import logger from '../utils/logger.js';

jest.mock('../utils/logger.js', () => ({
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
}));
