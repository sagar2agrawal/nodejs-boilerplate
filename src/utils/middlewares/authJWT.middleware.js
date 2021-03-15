import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const authJWT = (req, res, next) => {
  const authToken = req.headers.authorization;

  try {
    if (authToken) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      jwt.verify(token, config.JWT_SECRET, (err, decodedAuthToken) => {
        if (err) {
          throw new Error('Issues with Authentication Token');
        }
        req.decodedAuthToken = decodedAuthToken;
        next();
      });
    } else {
      throw new Error('Authentication error. Token required.');
    }
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export default authJWT;
