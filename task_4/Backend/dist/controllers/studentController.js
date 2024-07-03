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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextPage = exports.updateStudent = exports.deleteStudent = exports.addStudents = void 0;
const queries_1 = require("../services/queries");
const addStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, dob, mob_no, address } = req.body;
        if (!first_name || !last_name || !dob || !mob_no || !address) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        yield (0, queries_1.putData)(first_name, last_name, dob, mob_no, address);
        return res.status(201).send({
            success: true,
            message: 'New student record created',
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in create student API',
            error
        });
    }
});
exports.addStudents = addStudents;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentIdd = req.params.id;
        const studentId = parseInt(studentIdd);
        const id = yield (0, queries_1.checkId)(studentId);
        if (id == 0) {
            return res.status(400).send({
                success: false,
                message: 'Id mentioned does not exist'
            });
        }
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Please provide id or valid id"
            });
        }
        yield (0, queries_1.deleteData)(studentId);
        return res.status(200).send({
            success: true,
            message: "Deleted successfully"
        });
    }
    catch (error) {
        return res.status(400).send({
            success: false,
            message: "Error in delete student",
            error
        });
    }
});
exports.deleteStudent = deleteStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentIDD = req.params.id;
        const studentID = parseInt(studentIDD);
        const id = yield (0, queries_1.checkId)(studentID);
        if (id == 0) {
            return res.status(400).send({
                success: false,
                message: 'Id mentioned does not exist'
            });
        }
        if (!studentID) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide Student id'
            });
        }
        const { first_name, last_name, dob, mob_no, address } = req.body;
        yield (0, queries_1.updateData)(first_name, last_name, dob, mob_no, address, studentID);
        return res.status(200).send({
            success: true,
            message: 'Student Details Updated'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in Update student API',
            error
        });
    }
});
exports.updateStudent = updateStudent;
const nextPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNo = parseInt(req.query.pageNo);
    const noOfData = parseInt(req.query.noOfData);
    const dataFetch = req.query.dataFetch;
    const sortType = req.query.sortType;
    const colName = req.query.colName;
    try {
        const searchTotal = yield (0, queries_1.calcSearchTotal)(dataFetch || '');
        const data = yield (0, queries_1.getQuery)(pageNo || 1, noOfData || 3, dataFetch || '', sortType || 'desc', colName || 'id');
        return res.status(200).send({
            success: true,
            data: data,
            searchTotal: searchTotal,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in sort API',
            error
        });
    }
});
exports.nextPage = nextPage;
