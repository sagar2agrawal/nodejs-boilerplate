import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const authJWT = (req, res, next) => {
  const authToken = req.cookies.AuthToken;

  try {
    if (authToken) {
      // const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      jwt.verify(authToken, config.AUTH.JWT_SECRET, (err, decodedAuthToken) => {
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
