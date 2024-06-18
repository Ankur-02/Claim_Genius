const db = require("../config/db");
const qry = require("../services/queries");


//insert student
const addStudents = async(req,res)=>{
    try{
        const {first_name, last_name, dob, mob_no, address} = req.body;
        if(!first_name || !last_name || !dob || !mob_no || !address ){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        //const data = await db.query(`INSERT INTO students (first_name, last_name, dob, mob_no, address) VALUES (?,?,?,?,?)`,[first_name, last_name, dob, mob_no, address]);
        //const data = 
        await qry.putData(first_name, last_name, dob, mob_no, address);
        /*if(!data){
            return res.status(404).send({
                success: false,
                message: 'error in insert query'
            });
        }*/
        res.status(201).send({
            success: true,
            message: 'New student record created',
            
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in create student API',
            error
        });
    }
}


//delete student
const deleteStudent = async (req,res)=>{
    try{
        studentId = req.params.id;
        //const id = await db.query(`SELECT * from students WHERE id = ${studentId}`);
        const id = await qry.checkId(studentId);
        if(id[0].length==0){
            return res.status(400).send({
                success: false,
                message: 'Id mentioned does not exist'
            })
        }
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Please provide id or valid id"
            });
        }
        //await db.query("DELETE FROM students WHERE id = ?",[studentId])
        await qry.deleteData(studentId);
        res.status(200).send({
            success: true,
            message: "Deleted successfully"
        })
    }
    catch(error){
        res.status(400).send({
            success: false,
            message: "Error in delete student",
            error
        })
    }
}


//update student
const updateStudent =async (req,res)=>{
    try{
        const studentID = req.params.id;
        //const id = await db.query(`SELECT * from students WHERE id = ${studentID}`);
        const id = await qry.checkId(studentID);
        if(id[0].length==0){
            return res.status(400).send({
                success: false,
                message: 'Id mentioned does not exist'
            });
        }
        if(!studentID){
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide Student id'

            })
        }
        const {first_name, last_name, dob, mob_no, address} = req.body;
        //const data = await db.query(`UPDATE students SET first_name=?, last_name=?, dob=?, mob_no=?, address=? WHERE id=?`,[first_name, last_name, dob, mob_no, address, studentID])
        await qry.updateData(first_name, last_name, dob, mob_no, address, studentID);

        res.status(200).send({
            success: true,
            message: 'Student Details Updated'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in Update student API',
            //error
        });
    }
}


const nextPage = async(req,res)=>{
    const {pageNo} = req.query;
    const {noOfData} = req.query;
    const intPageNo = parseInt(pageNo)
    const intNoOfData = parseInt(noOfData)
    const {dataFetch} = req.query;
    const { sortType } = req.query;
    const { colName } = req.query;
        try{
            const searchTotal = await qry.calcSearchTotal(dataFetch || '');
            const data = await qry.getQuery(intPageNo || 1, intNoOfData || 3,dataFetch || '', sortType || 'desc', colName || 'id');
            res.status(200).send({
                success: true,
                data: data,
                searchTotal: searchTotal,
                
            });
            
        }
        catch(error){
            console.log(error)
            res.status(400).send({
                success:false,
                message: 'Error in sort API',
                error
            })
        }
}


module.exports = {addStudents, deleteStudent, updateStudent, nextPage}