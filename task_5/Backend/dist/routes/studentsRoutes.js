"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const joiValidation_1 = require("../schema/joiValidation");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: './src/image/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpeg|pdf|jpg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        console.log("mimetype Error");
        return cb(new Error(' Images in following format only! (jpeg, pdf, jpg, png)'));
    }
}
router.post("/insert", auth_1.verifyToken, upload.single('myFile'), joiValidation_1.validateUser, studentController_1.addStudents);
router.delete('/delete/:id', auth_1.verifyToken, studentController_1.deleteStudent);
router.put('/update/:id', auth_1.verifyToken, upload.single('myFile'), joiValidation_1.validateUser, studentController_1.updateStudent);
router.get('/page', auth_1.verifyToken, studentController_1.nextPage);
router.post('/upload', auth_1.verifyToken, upload.array('images', 10), studentController_1.insert_img);
router.get('/get', auth_1.verifyToken, studentController_1.get_images);
exports.default = router;
