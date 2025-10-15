import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { js } from '@eslint/js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookie.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Unauthrized - no token provided' })
        };

        const decoded = jwt.verify(token, process.env.JWT_SCERET);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthrized - Invalid token' })
        };

        const user = await User.findById(decoded.userid).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        };

        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
};

