import { Card } from "../repositories/cardRepository.js";
import dayjs from "dayjs";

export function apiKeyValidation(apiKey: string) {
    if(!apiKey) {
        throw {
            type: "Not found",
            message: "API Key not found or invalid"
        }
    }
}

export function cardExistsValidation(cardExists: Card) {
    if(!cardExists) {
        throw {
            type: "Not found",
            message: "No card was found"
        }
    }
}

export function expirationDateValidation(cardExists: Card) {
    if (dayjs(cardExists.expirationDate).isBefore(dayjs().format('MM-YYYY'))) {
        throw {
            type: "Forbidden",
            message: "Your card is expired"
        }
    }
}