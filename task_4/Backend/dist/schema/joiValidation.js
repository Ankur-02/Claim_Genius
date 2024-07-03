"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUser = (req, res, next) => {
    const JoiSchema = joi_1.default.object({
        first_name: joi_1.default.string()
            .required()
            .messages({
            'string.base': `First Name should contain only Alphabets`,
            'string.empty': `First Name cannot be an empty field`,
            'any.required': `First Name is a required field`
        }),
        last_name: joi_1.default.string()
            .required()
            .messages({
            'string.base': `Last Name should contain only Alphabets`,
            'string.empty': `Last Name cannot be an empty field`,
            'any.required': `Last Name is a required field`
        }),
        dob: joi_1.default.string()
            .required()
            .messages({
            'string.base': `Date of Birth should be a valid date`,
            'any.required': `Date of Birth is a required field`
        }),
        mob_no: joi_1.default.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
            'string.base': `Mobile Number should be a type of text`,
            'string.empty': `Mobile Number cannot be an empty field`,
            'string.pattern.base': `Mobile Number should only contain digits and should contain only 10 digits`,
            'any.required': `Mobile Number is a required field`
        }),
        address: joi_1.default.string()
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
        console.log(error);
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};
exports.validateUser = validateUser;
