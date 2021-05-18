//validation
const Joi = require('joi');

//register validation
const registerValidation = (userInfo) => {
    const validationSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        password2: Joi.string().min(6).required()
    });
    return validationSchema.validate(userInfo);
};

//login validation
const loginValidation = (userInfo) => {
    const validationSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return validationSchema.validate(userInfo);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;