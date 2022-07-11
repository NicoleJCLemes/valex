import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if(error.response) {
        return res.sendStatus(error.response.status);
    }

    res.sendStatus(500);

}