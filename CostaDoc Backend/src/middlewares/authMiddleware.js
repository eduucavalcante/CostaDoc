import jwt from 'jsonwebtoken';
import dotenv from '../config/envConfig.js';

export const isUserLoggedIn = (req, res, next) => {
    const token = req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!token) {
        return res.status(401).json({ message: 'Acesso negado: o usuário precisa estar logado!', code: 401 });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = {
            id: decoded.userId,
            username: decoded.username,
            email: decoded.email
        };
        next();
    } catch(error) {
        res.status(401).json({ message: 'Token inválido', code: 401 });
    }
}