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
exports.get_images = exports.insert_img = exports.nextPage = exports.updateStudent = exports.deleteStudent = exports.addStudents = void 0;
const queries_1 = require("../services/queries");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
            message: 'Error in fetch records API',
            error
        });
    }
});
exports.nextPage = nextPage;
const insert_img = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['authorization'];
        const images = req.files;
        let multiple_images = '';
        if (!images) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        else {
            const parseJwt = (token) => {
                try {
                    if (token)
                        return JSON.parse(atob(token.split('.')[1]));
                }
                catch (e) {
                    return null;
                }
            };
            const id = parseJwt(token);
            const data = yield (0, queries_1.getImage)(id.data1.user_id);
            if (data.length) {
                multiple_images = data[0].image;
            }
            for (const imagee of images) {
                multiple_images = multiple_images + imagee.filename + ',';
            }
            if (data.length) {
                yield (0, queries_1.updateImage)(id.data1.user_id, multiple_images);
            }
            else {
                yield (0, queries_1.putImage)(id.data1.user_id, multiple_images);
            }
            return res.status(201).send({
                success: true,
                message: 'Image/s uploaded successfully!'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error in upload Image API"
        });
    }
});
exports.insert_img = insert_img;
const get_images = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['authorization'];
        const id = req.body.d_token.data1.user_id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide user id properly'
            });
        }
        const data = yield (0, queries_1.getImage)(id);
        let data11 = [];
        for (let i = 0; i < data.length; i++) {
            data11.push(data[i].image.split(',').slice(0, -1));
        }
        let data2 = [];
        for (let i = 0; i < data11.length; i++) {
            data2.push(...data11[i]);
        }
        for (let i = 0; i < data2.length; i++) {
            data2[i] = `http://localhost:${process.env.PORT}/image/` + data2[i];
        }
        return res.status(200).send({
            success: true,
            message: "Successfully fetched Users",
            data: data2
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in Get Image API',
            error
        });
    }
});
exports.get_images = get_images;
