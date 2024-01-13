const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        console.log('Received Token:', token); // Log the received token

        // Skip token verification for login route
        if (req.path === '/api/user/login' || req.path === '/api/user/register') {
            console.log('Skipping token verification for login route.');
            return next();
        }

        if (!token) {
            console.log('Unauthorized access. Token missing.');
            return res.status(401).json('Unauthorized access. Token missing.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log the decoded token

        // Fetch user details from the database and attach it to the request object
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            console.log('Unauthorized access. User not found.');
            return res.status(401).json('Unauthorized access. User not found.');
        }

        req.user = {
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
        };

        console.log('Authentication successful.');
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        console.log('Unauthorized access. Invalid token.');
        return res.status(401).json('Unauthorized access. Invalid token.');
    }
};

module.exports = authenticateUser;
