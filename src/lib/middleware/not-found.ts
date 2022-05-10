import { Request, Response, NextFunction } from 'express';

interface ResponseError extends Error {
    status?: number;
}
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const err: ResponseError = new Error('Not Found - Bad Endpoint');
    err.status = 404;
    next(err);
}

export default notFound;