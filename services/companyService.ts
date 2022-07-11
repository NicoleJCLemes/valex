import { findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";

export async function createCardService(apiKey: string, employeeId: number, type: TransactionTypes) {

    if(!apiKey) {
        throw {
            type: "Not found",
            message: "API Key not found or invalid"
        }
    }

    const companyExists = await findByApiKey(apiKey);
    if(!companyExists) {
        throw {
            type: "Not found",
            message: "No company was found"
        }
    }

    const employeeExists = await findById(employeeId);
    if(!employeeExists) {
        throw {
            type: "Not found",
            message: "No employee was found"
        }
    }

    const cardTypeExists = await findByTypeAndEmployeeId(type, employeeId);
    if(!cardTypeExists) {
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