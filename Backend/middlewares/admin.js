// middlewares/admin.js
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const adminOnly = async (req, res, next) => {
  try {
    const { userId } = await req.auth();
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await clerk.users.getUser(userId);
    if (user.publicMetadata?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // Attach user info to request if needed
    req.user = user;
    next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    return res.status(401).json({ message: 'Invalid or expired session' });
  }
};

export default adminOnly;
