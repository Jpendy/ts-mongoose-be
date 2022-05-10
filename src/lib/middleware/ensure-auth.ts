import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export default async function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.session;
    try {
        const user = User.verifyToken(token)
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}