const db = require("../config/db");
const qry = require("../services/queries");

// get all
const getStudents = async(req,res)=>{
    try{
        const data = await qry.getData();
        //const data = await db.query('SELECT * FROM students');
        if(!data){
            return res.status(404).send({
                success:false,
                message: 'No records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All students Records',
            data: data[0]
        })
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in getStudents',
            error
        })
    }
}

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



//delete
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
            })
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
        /*if(!data){
            return res.status(400).send({
                success: false,
                message: 'Error in Update Data'
            });
        }*/
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



//search

const searchData = async (pageNo, noOfData, dataFetch)=>{
    
    try{
        //const { dataFetch } = req.query;

        if(!dataFetch){
            return res.status(400).send({
                success: false,
                message: 'Enter Something in search Box'

            });
        }
        //const data = await db.query(`SELECT * FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%'`);
        const data = await qry.searchStud(pageNo, noOfData, dataFetch);     
        if(!data.length){
            res.status(200).send({
                success: false,
                message: 'No record found'
            })
        }
        res.status(200).send({
            success: true,
            data: data[0],
        })
        //console.log(data)
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in Search API',
            error
        });
    }
}

const sortCol = async(intPageNo, intNoOfData,sortType, colName)=>{
    // const { sortType } = req.query;
    // const { colName } = req.query;
    console.log(sortType,colName)
    try{
        if(sortType !== "asc" && sortType !== "desc"){
            return res.status(400).send({
                success:false,
                message: 'Problem in Ascending or Descending keyword'
            });
        }
        if(colName!="id" && colName != "first_name" && colName != "last_name" && colName != "dob" && colName != "mob_no" && colName != "address"){
            return res.status(400).send({
                success: false,
                message: 'Enter valid column name'
            })
        }
        const data = await qry.sortData(intPageNo, intNoOfData, sortType, colName);
        console.log(data)
        res.status(200).send({
            success: true,
            data: data,
        })
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

const nextPage = async(req,res)=>{
    const {pageNo} = req.query;
    const {noOfData} = req.query;
    const intPageNo = parseInt(pageNo)
    const intNoOfData = parseInt(noOfData)
    const {dataFetch} = req.query;
    const { sortType } = req.query;
    const { colName } = req.query;
    // if(pageNo && noOfData && !dataFetch && !sortType && !colName){
        
    console.log(intPageNo);
    console.log(intNoOfData);
    console.log(dataFetch);
    console.log(sortType);
    console.log(colName);
    console.log("helloHi");
        try{
            if(!pageNo && !noOfData){
                return res.status(400).send({
                    success: false,
                    message: 'Error in Query Parameter'

                });
            }
            const data = await qry.getQuery(intPageNo, intNoOfData,dataFetch, sortType, colName);
            console.log(data)
            res.status(200).send({
                success: true,
                data: data,
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
    // }
    // else if(intPageNo && intNoOfData && dataFetch && !sortType && !colName){
    //     searchData(intPageNo, intNoOfData, dataFetch);
    // }
    // else if(intPageNo && intNoOfData && !dataFetch && sortType && colName){
    //     sortData(intPageNo, intNoOfData, sortType, colName);
    // }
}


module.exports = {addStudents, deleteStudent, updateStudent, nextPage}



/*pageNo: page.value,
        noOfData: perPage,
        searchQuery: searchBox.value,
        sortType: sortType.value,
        sortBy: arrForSorting.value*/