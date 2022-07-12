import { findById, update } from "../repositories/cardRepository.js";
import { cardExistsValidation, expirationDateValidation } from "../utils/cardUtils.js";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import { passwordValidation } from "../middlewares/schemasValidations.js";

export async function activateCardService(securityCode: string, password:string, id:number) {
    
    const cardExists = await findById(id);

    cardExistsValidation(cardExists);
    expirationDateValidation(cardExists);

    if(cardExists.password) {
        throw {
            type: "Conflict",
            message: "This card was already activated"
        };
    };

    const cryptr = new Cryptr("#m1y2s3e4c5r6e7t8k9e0y$");
    const cvc = cryptr.decrypt(cardExists.securityCode);

    if(cvc !== securityCode) {
        throw {
            type: "Forbidden",
            message: "This security code is invalid"
        };
    };

    passwordValidation(password);

    await update(id,{
        securityCode,
        password: bcrypt.hashSync(password, 10)
    });
}