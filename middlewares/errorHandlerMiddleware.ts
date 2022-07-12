import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if(error) {
        return res.send(error.message);
    }

    res.sendStatus(500);
    next();
}