import { ErrorRequestHandler } from 'express';
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let status = err.status || 500;
    res.status(status);
    console.log(err);
    res.send({
        status,
        message: err.message
    });
}

export default errorHandler;