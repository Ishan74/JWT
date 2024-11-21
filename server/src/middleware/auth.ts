import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: number; // Add any other properties stored in the token payload
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Attach user data to the request object
    req.user = payload;

    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
