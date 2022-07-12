import Joi from "joi";

export function passwordValidation(password: string) {

    const passwordSchema = Joi.object({
        password: Joi.string().pattern(/^[0-9]{4}$/).required()
    });

    const validation = passwordSchema.validate({password});
    if(validation.error) {
        throw {
            type: "Forbidden",
            message: validation.error.details.map((err) => err.message)
        };
    };
}