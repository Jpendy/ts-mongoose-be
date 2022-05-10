import jwt from 'jsonwebtoken';
import User from '../models/User';

export function createToken(user: User) {
    delete user.password_hash;
    return jwt.sign({ ...user }, process.env.APP_SECRET!, {
        expiresIn: '24h'
    })
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.APP_SECRET!)
}