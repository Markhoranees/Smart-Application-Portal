// middlewares/admin.js
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

const clerk = new Clerk({  });

const adminOnly = async (req, res, next) => {
  try {
    // Extract session ID from header or cookie (adjust according to your setup)
    const sessionToken = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.__session;

    if (!sessionToken) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const session = await clerk.sessions.verifySessionToken(sessionToken);
    const user = await clerk.users.getUser(session.userId);

    if (user.publicMetadata?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // Attach user or session info to request if needed
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired session' });
  }
};

export default adminOnly;
