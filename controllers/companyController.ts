import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { createCardholderName, createCardService } from "../services/companyService.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";

export async function createCard(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: TransactionTypes} = req.body;
    const apiKey: string = req.headers["x-api-key"].toString();

    createCardService(apiKey, employeeId, type);
    const cardholderName = createCardholderName(employeeId);
    const expirationDate = dayjs().add(5, 'years').format('MM/YYYY');
    const cvc = faker.finance.creditCardCVV();
    const cryptr = new Cryptr(process.env.SECRET_KEY)

    const card = {
        employeeId,
        number: faker.finance.creditCardNumber('####-####-####-####'),
        cardholderName,
        securityCode: cryptr.encrypt(cvc),
        expirationDate,
        password: 1,
        isVirtual: false,
        originalCardId: 1,
        isBlocked: true,
        type
    }

    res.send(card).status(201);
}

export async function rechargeCard() {

}