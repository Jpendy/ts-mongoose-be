import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { verifyToken } from '../utils/jwt';

interface JwtPayload {
    id: string;
}

export default async function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.session;
    try {
        const verifiedUser = verifyToken(token) as JwtPayload;
        const user = await User.findById(verifiedUser.id)

        delete user.password_hash;
        req.user = user;

        next();
    } catch (err) {
        next(err);
    }
}