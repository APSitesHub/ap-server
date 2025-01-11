const jwt = require('jsonwebtoken');
const Users = require("../../db/models/usersModel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.SECRET); 
        const user = await Users.findById(decoded.id);
        if (!user) {
            throw new Error();
        }

        req.body.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;