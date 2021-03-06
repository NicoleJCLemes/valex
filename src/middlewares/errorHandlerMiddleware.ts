import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

	if (error.code) {
		if(error.code === "22P02") return res.send("This option is not possible").status(403);
	};

    if (error.type === 'Forbidden') return res.send(error.message).status(403);
	if (error.type === 'Conflict') return res.send(error.message).status(409);
	if (error.type === 'Not found') return res.send(error.message).status(404);

	return res.sendStatus(500);

}