"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = exports.calcSearchTotal = exports.checkId = exports.updateData = exports.deleteData = exports.putData = void 0;
const db_1 = __importDefault(require("../config/db"));
const putData = (first_name, last_name, dob, mob_no, address) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.query(`INSERT INTO students (first_name, last_name, dob, mob_no, address) VALUES (?,?,?,?,?)`, [first_name, last_name, dob, mob_no, address]);
});
exports.putData = putData;
const deleteData = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query("DELETE FROM students WHERE id = ?", [studentId]);
});
exports.deleteData = deleteData;
const updateData = (first_name, last_name, dob, mob_no, address, studentID) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`UPDATE students SET first_name=?, last_name=?, dob=?, mob_no=?, address=? WHERE id=?`, [first_name, last_name, dob, mob_no, address, studentID]);
});
exports.updateData = updateData;
const checkId = (studentID) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`SELECT COUNT(*) as count from students WHERE id = ?`, [studentID]);
    const [{ count }] = rows;
    return count;
});
exports.checkId = checkId;
const calcSearchTotal = (dataFetch) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query(`SELECT COUNT(id) as total FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%'`);
    const [{ total }] = rows;
    return total;
});
exports.calcSearchTotal = calcSearchTotal;
const getQuery = (pageNo, noOfData, dataFetch, sortType, colName) => __awaiter(void 0, void 0, void 0, function* () {
    const calc = (pageNo - 1) * noOfData;
    const [data] = yield db_1.default.query(`SELECT * FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%' ORDER BY ${colName} ${sortType} LIMIT ${noOfData} OFFSET ${calc}`);
    return data;
});
exports.getQuery = getQuery;
