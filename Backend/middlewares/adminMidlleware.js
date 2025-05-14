// middlewares/adminMiddleware.js
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const adminMiddleware = (req, res, next) => {
  if (!req.auth || !req.auth.user || !req.auth.user.roles.includes('admin')) {
    return res.status(403).json({ message: 'Access Denied. Admins only.' });
  }
  next();
};

export default adminMiddleware;
