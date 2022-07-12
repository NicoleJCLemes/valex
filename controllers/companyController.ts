import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import { createCardholderName, createCardService, rechargeCardService } from "../services/companyService.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import "../config/setup.js";
import { insert } from "../repositories/rechargeRepository.js";

export async function createCard(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: TransactionTypes} = req.body;
    const apiKey: string = req.headers["x-api-key"].toString();

    await createCardService(apiKey, employeeId, type);
    const cardholderName = createCardholderName(employeeId);
    const expirationDate = dayjs().add(5, 'years').format('MM/YYYY');
    const cvc = faker.finance.creditCardCVV();
    const cryptr = new Cryptr("#m1y2s3e4c5r6e7t8k9e0y$");

    const card = {
        employeeId,
        number: faker.finance.creditCardNumber('####-####-####-####'),
        cardholderName,
        securityCode: cryptr.encrypt(cvc),
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    }

    res.sendStatus(201);
}

export async function rechargeCard(req: Request, res: Response) {
    const { id } = req.params;
    const { amount } = req.body;
    const apiKey: string = req.headers["x-api-key"].toString();

    await rechargeCardService(parseInt(id), apiKey, amount);

    const recharge = {
        cardId: parseInt(id),
        amount: parseInt(amount),
        timestamp: +Date.now
    }

    await insert(recharge);

    res.sendStatus(201)
}