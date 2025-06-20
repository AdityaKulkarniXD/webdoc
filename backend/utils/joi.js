const Joi = require("joi");

const passwordSchema = Joi.string()
    .pattern(
        new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
        )
    )
    .message(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one special character, and one number."
    )
    .required();

const optionalPasswordSchema = passwordSchema.optional();
module.exports = {
    passwordSchema,
    optionalPasswordSchema,
};