import { Response, Router } from "express";
import ensureAuth from "../middleware/ensure-auth";
import User from "../models/User";
import UserService from "../services/UserService";
import { createToken } from "../utils/jwt";

const ONE_DAY = 1000 * 60 * 60 * 24;

const attachCookie = (res: Response, user: User) => {
    res.cookie('session', createToken(user), {
        httpOnly: true,
        maxAge: ONE_DAY,
        sameSite: 'none',
        secure: true
    })
}

export default Router()
    .post('/signup', (req, res, next) => {
        UserService.create(req.body)
            .then(user => {
                attachCookie(res, user)
                res.send(user)
            })
            .catch(next)
    })

    .post('/login', (req, res, next) => {
        UserService.authorize(req.body)
            .then(user => {
                attachCookie(res, user);
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