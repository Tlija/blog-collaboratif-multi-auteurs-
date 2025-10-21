const jwt = require('jsonwebtoken');
const AppError = require("../utils/error/app_error");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Token manquant ou invalide', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'tlija secret');
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError('Token invalide ou expiré', 401));
    }
};

module.exports = authMiddleware;