"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const joiValidation_1 = require("../schema/joiValidation");
const router = express_1.default.Router();
router.post("/insert", joiValidation_1.validateUser, studentController_1.addStudents);
router.delete('/delete/:id', studentController_1.deleteStudent);
router.put('/update/:id', joiValidation_1.validateUser, studentController_1.updateStudent);
router.get('/page', studentController_1.nextPage);
exports.default = router;
