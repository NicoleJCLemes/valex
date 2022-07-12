import { findByTypeAndEmployeeId, TransactionTypes, findById as findCardById } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { apiKeyValidation, cardExistsValidation, expirationDateValidation } from "../utils/cardUtils.js";

export async function createCardService(apiKey: string, employeeId: number, type: TransactionTypes) {

    apiKeyValidation(apiKey);

    const companyExists = await findByApiKey(apiKey);
    if(!companyExists) {
        throw {
            type: "Not found",
            message: "No company was found"
        }
    }

    const employeeExists = await findById(employeeId);
    console.log(employeeExists)
    if(!employeeExists) {
        throw {
            type: "Not found",
            message: "No employee was found"
        }
    }

    const cardTypeExists = await findByTypeAndEmployeeId(type, employeeId);
    console.log(cardTypeExists);
    if(cardTypeExists) {
        throw {
            type: "Conflict",
            message: "This employee already has this card type"
        }
    }
}

export async function createCardholderName (employeeId:number) {

    const employeeFullName = (await findById(employeeId)).fullName;
    const employeeFullNameArray = employeeFullName.toUpperCase().split(" ");
    const firstName = employeeFullNameArray[0];
    const lastName = employeeFullNameArray[employeeFullNameArray.length - 1];
    let middleLetters = "";

    for(let i = 1; i < employeeFullNameArray.length - 1; i++) {
        if (employeeFullNameArray[i].length > 2) {
            middleLetters += employeeFullNameArray[i][0] + " ";
        };
    };

    return firstName + " " + middleLetters + lastName
    
}

export async function rechargeCardService (id:number, apiKey: string, amount: number) {

    apiKeyValidation(apiKey);

    const cardExists = await findCardById(id);
    cardExistsValidation(cardExists);
    
    if(cardExists.isBlocked === true) {
        throw {
            type: "Forbidden",
            message: "You have to activate your card first"
        }
    }
    
    expirationDateValidation(cardExists);

    if(amount < 0) {
        throw {
            type: "Forbidden",
            message: "The amount must be greater than zero"
        }
    }

}