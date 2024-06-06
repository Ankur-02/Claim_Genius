const express = require('express');
const { getStudents, addStudents, deleteStudent, updateStudent} = require('../controllers/studentController');

//  qwedfrghjkl;
//router object
const router = express.Router();

//routes


//get all
router.get("/getall", getStudents);


//insert
router.post("/insert",addStudents);

//delete
router.delete('/delete/:id',deleteStudent)

//update
router.put('/update/:id', updateStudent)



module.exports = router;