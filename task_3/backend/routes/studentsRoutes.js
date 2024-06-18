const express = require('express');
const { addStudents, deleteStudent, updateStudent, nextPage} = require('../controllers/studentController');
//const{addStudents, deleteStudent, updateStudent, nextPage} = require('../controllers/tryStudentController');
const {validateUser} = require('../schema/joiValidation');

//router object
const router = express.Router();





//ROUTES
//get all
// router.get("/getall", getStudents);

//insert
router.post("/insert",validateUser,addStudents);
// router.post("/insert",addStudents);

//delete
router.delete('/delete/:id',deleteStudent)

//update
router.put('/update/:id',validateUser, updateStudent)
// router.put('/update/:id', updateStudent)

//search
// router.get('/searchtxt', searchData)

//searchforlen
//router.get('/search',calcLen)

//sort
// router.get('/sort',sortCol)

//pagination
router.get('/page',nextPage)


module.exports = router;