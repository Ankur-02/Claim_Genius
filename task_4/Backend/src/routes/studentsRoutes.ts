import express,{Request, Response} from 'express';
import {Router} from 'express'
import { addStudents, deleteStudent, updateStudent, nextPage} from '../controllers/studentController';
import {validateUser} from '../schema/joiValidation';



//router object
const router:Router = express.Router();





//ROUTES

//insert
router.post("/insert",validateUser,addStudents);

//delete
router.delete('/delete/:id',deleteStudent)

//update
router.put('/update/:id',validateUser, updateStudent)

//pagination
router.get('/page',nextPage)


export default router;