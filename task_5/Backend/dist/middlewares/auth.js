"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const login_user = {
        email: '',
        password: ''
    };
    const secret = process.env.secret || '';
    const token = req.cookies['authorization'];
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Token Not Found"
        });
    }
    else {
        try {
            const d_token = jsonwebtoken_1.default.verify(token, secret);
            req.body.d_token = d_token;
            next();
        }
        catch (error) {
            return res.status(403).send({
                success: false,
                message: "Token is not Valid"
            });
        }
    }
}
exports.verifyToken = verifyToken;
