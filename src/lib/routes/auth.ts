import { Response, Router } from "express";
import ensureAuth from "../middleware/ensure-auth";
import User, { IUser } from "../models/User";

const ONE_DAY = 1000 * 60 * 60 * 24;

const setCookie = (res: Response, user: IUser) => {
    res.cookie('session', user.createAuthToken(), {
        httpOnly: true,
        maxAge: ONE_DAY,
        sameSite: 'none',
        secure: true
    });
}

export default Router()
    .post('/signup', (req, res, next) => {
        User
            .create(req.body)
            .then(user => {
                setCookie(res, user)
                res.send(user)
            })
            .catch(next);
    })

    .post('/login', (req, res, next) => {
        User.authorize(req.body)
            .then(user => {
                setCookie(res, user);
                res.send(user)
            })
            .catch(next)
    })

    .get('/logout', (_, res) => {
        res.clearCookie('session', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        res.send({ logout: true })
    })

    .get('/verify', ensureAuth, (req, res) => {
        res.send(req.user)
    })