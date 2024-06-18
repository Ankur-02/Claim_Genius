const Joi = require('joi');

//for update and insert
const validateUser = (req, res, next) => {
    const JoiSchema = Joi.object({
    first_name: Joi.string()
        .required()
        .messages({
        'string.base': `First Name should contain only Alphabets`,
        'string.empty': `First Name cannot be an empty field`,
        'any.required': `First Name is a required field`
        }),
    last_name: Joi.string()
        .required()
        .messages({
        'string.base': `Last Name should contain only Alphabets`,
        'string.empty': `Last Name cannot be an empty field`,
        'any.required': `Last Name is a required field`
        }),
    dob: Joi.string()
        .required()
        .messages({
        'string.base': `Date of Birth should be a valid date`,
        'any.required': `Date of Birth is a required field`
        }),
    mob_no: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        'string.base': `Mobile Number should be a type of text`,
        'string.empty': `Mobile Number cannot be an empty field`,
        'string.pattern.base': `Mobile Number should only contain digits and should contain only 10 digits`,
        'any.required': `Mobile Number is a required field`
        }),
    address: Joi.string()
        .required()
        .messages({
        'string.base': `Address should be a type of text`,
        'string.empty': `Address cannot be an empty field`,
        'any.required': `Address is a required field`
        })
    });
    const items = req.body;
    delete items["id"];
    const { error } = JoiSchema.validate(items, { abortEarly: false });
    
    if (error) {
        console.log(error)
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};


module.exports = {validateUser};
