const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Por favor, faça login para acessar' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = {
    authMiddleware,
};