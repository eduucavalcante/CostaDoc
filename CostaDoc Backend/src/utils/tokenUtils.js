import jwt from 'jsonwebtoken';
import dotenv from '../config/envConfig.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateAuthToken = (id, username, email) => {
    const generatedToken = jwt.sign({
        userId: id,
        username: username,
        email: email
    }, JWT_SECRET, {
        expiresIn: '7d'
    });

    return generatedToken;
}

export const verifyAuthToken = (token) => {
    return;
}