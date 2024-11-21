import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }
    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user data to the request object
        req.user = payload;
        next(); // Call the next middleware or route handler
    }
    catch (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
