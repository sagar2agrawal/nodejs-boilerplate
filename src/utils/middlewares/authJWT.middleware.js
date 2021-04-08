import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const authJWT = (req, res, next) => {
  const authToken = req.cookies.AuthToken;

  try {
    if (authToken) {
      jwt.verify(authToken, config.AUTH.JWT_SECRET, (err, decodedAuthToken) => {
        if (err) {
          throw new Error('Issues with Authentication Token');
        }

        // Adding the current user info to req object so controller can use it
        req.user = {};
        req.user.id = decodedAuthToken.id;
        req.user.name = decodedAuthToken.name;
        req.user.role = decodedAuthToken.role;
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
