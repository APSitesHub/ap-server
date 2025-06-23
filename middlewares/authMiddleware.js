const jwt = require('jsonwebtoken');
const Users = require('../db/models/usersModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await Users.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
