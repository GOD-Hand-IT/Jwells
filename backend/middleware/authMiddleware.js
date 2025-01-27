import jwt from 'jsonwebtoken'

export const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export const setAuthCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Changed to false for development
        sameSite: 'lax', // Changed from 'strict' to 'lax'
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
    });
}

export const clearAuth = (req, res) => {
    // Clear the auth cookie
    res.clearCookie('token');

    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
    });
}
