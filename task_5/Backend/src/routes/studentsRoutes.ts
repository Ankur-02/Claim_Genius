import express,{Request, Response} from 'express';
import {Router} from 'express'
import { addStudents, deleteStudent, updateStudent, nextPage, insert_img, get_images} from '../controllers/studentController';
import {validateUser} from '../schema/joiValidation';
import {verifyToken} from '../middlewares/auth';
import multer from 'multer'
import path from 'path';



//router object
const router:Router = express.Router();


const storage = multer.diskStorage({
    destination: './src/image/',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({
    storage:storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
      }
})

function checkFileType(file:Express.Multer.File, cb:multer.FileFilterCallback) {
    const filetypes = /jpeg|pdf|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      console.log("mimetype Error");
      
      return cb(new Error(' Images in following format only! (jpeg, pdf, jpg, png)'));
    }
  }


//ROUTES(Data Manipulation)

//insert
router.post("/insert",verifyToken,upload.single('myFile'),validateUser,addStudents);



//delete
router.delete('/delete/:id',verifyToken,deleteStudent)

//update
router.put('/update/:id',verifyToken, upload.single('myFile'), validateUser, updateStudent)

//pagination
router.get('/page',verifyToken,nextPage)

//insert image
router.post('/upload',verifyToken, upload.array('images', 10), insert_img)

//get image
router.get('/get',verifyToken, get_images)
export default router;