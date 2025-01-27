import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.auth_token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if session userId matches token userId
        if (req.session.userId !== decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid session"
            });
        }

        // Add user data to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default verifyToken;
