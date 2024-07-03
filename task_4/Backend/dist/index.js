"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const studentsRoutes_1 = __importDefault(require("./routes/studentsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/crud', studentsRoutes_1.default);
const PORT = process.env.PORT || 8000;
db_1.default
    .query('SELECT 1')
    .then(() => {
    console.log("MySQL db connected");
    app.listen(PORT, () => {
        console.log(`Server Running on ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
