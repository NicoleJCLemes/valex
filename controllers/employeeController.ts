import { Request, Response } from "express";
import { activateCardService, viewTransactionsService } from "../services/employeeService.js";

export async function activateCard(req:Request, res: Response) {
    const {securityCode, password}: {securityCode: string, password:string} = req.body;
    const {id} = req.params;

    activateCardService(securityCode, password, parseInt(id));

    res.sendStatus(200);
}

export async function viewTransactions(req:Request, res: Response) {
    const {id} = req.params;

    const balance = viewTransactionsService(parseInt(id));

    res.send(balance);
}

export async function changeCardStatus(req:Request, res: Response) {
    
}

export async function shopping(req:Request, res: Response) {
    
}