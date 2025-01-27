import jwt from 'jsonwebtoken'

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token
        console.log("token", req.cookies?.token)

        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                error: true,
                success: false,
                redirect: '/login'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false,
                    redirect: '/login'
                })
            }

            req.userId = decoded?._id
            next()
        });

    } catch (err) {
        res.status(401).json({
            message: err.message || "Authentication failed",
            error: true,
            success: false,
            redirect: '/login'
        })
    }
}

export default authToken