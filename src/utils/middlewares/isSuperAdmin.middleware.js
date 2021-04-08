// Checking if the request has user object role superadmin
const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'superadmin') {
      throw new Error('User does not have super admin rights');
    }
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export default isSuperAdmin;
