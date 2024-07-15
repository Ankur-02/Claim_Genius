"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user = exports.set_user = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'ankur369@';
function set_user(user) {
    return jsonwebtoken_1.default.sign(user, secret);
}
exports.set_user = set_user;
function get_user(token) {
    if (!token)
        return null;
    return jsonwebtoken_1.default.verify(token, secret);
}
exports.get_user = get_user;
