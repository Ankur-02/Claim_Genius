const db = require("../config/db");

const getData = async ()=>{
    const [data] = await db.query('SELECT * FROM students');
    return [data];
}

const putData= async(first_name, last_name, dob, mob_no, address)=>{
    const data = await db.query(`INSERT INTO students (first_name, last_name, dob, mob_no, address) VALUES (?,?,?,?,?)`,[first_name, last_name, dob, mob_no, address]);
}

const deleteData = async(studentId)=>{
    await db.query("DELETE FROM students WHERE id = ?",[studentId])
}

const updateData = async(first_name, last_name, dob, mob_no, address, studentID) =>{
    await db.query(`UPDATE students SET first_name=?, last_name=?, dob=?, mob_no=?, address=? WHERE id=?`,[first_name, last_name, dob, mob_no, address, studentID])
}

const searchStud = async(dataFetch, intPageNo, intNoOfData)=>{
    const calc = (intPageNo-1)*intNoOfData;
    const [data] = await db.query(`SELECT * FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%' ORDER BY ID DESC LIMIT ${intNoOfData} OFFSET ${calc}`);
    return [data]
}

const checkId = async(studentID)=>{
    const [data] = await db.query(`SELECT * from students WHERE id = ${studentID}`);
    return [data];
}

const sortData = async(sortType, colName, intPageNo, intNoOfData)=>{
    const calc = (intPageNo-1)*intNoOfData;
    const [data] = await db.query(`SELECT * FROM students ORDER BY ${colName} ${sortType} LIMIT ${intNoOfData} OFFSET ${calc}`);
    return [data];
}

const pageWiseData = async(intPageNo, intNoOfData)=>{
    const calc = (intPageNo-1)*intNoOfData;
    const[data] = await db.query(`SELECT * FROM students ORDER BY ID desc LIMIT ${intNoOfData} OFFSET ${calc}`)
    return [data];
}

const calcSearchTotal = async(dataFetch) =>{
    const [data] = await db.query(`SELECT COUNT(id) as total FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%'`);
    return data[0].total;//[0][0].total;
}

const getQuery = async(intPageNo, intNoOfData, dataFetch, sortType, colName)=>{
    const calc = (intPageNo-1)*intNoOfData;
    const [data] = await db.query(`SELECT * FROM students WHERE first_name like '%${dataFetch}%' OR last_name like '%${dataFetch}%' OR dob like '%${dataFetch}%' OR mob_no like '%${dataFetch}%' OR address like '%${dataFetch}%' ORDER BY ${colName} ${sortType} LIMIT ${intNoOfData} OFFSET ${calc}`);
    return [data];
}

module.exports = {getData, putData, deleteData, updateData, searchStud, checkId, sortData, pageWiseData, calcSearchTotal, getQuery}