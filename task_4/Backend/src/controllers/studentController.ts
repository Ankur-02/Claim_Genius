
import {putData, deleteData, updateData, checkId, calcSearchTotal, getQuery} from "../services/queries"
import {Request, Response} from 'express';
import type {ApiResponse, User, QueryParams, UserParams} from '../types/type'

//insert student
export const addStudents = async(req: Request,res: Response<ApiResponse>):Promise<Response<ApiResponse>>=>{
    try{
        const {first_name, last_name, dob, mob_no, address} = req.body as User;
        if(!first_name || !last_name || !dob || !mob_no || !address ){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        await putData(first_name, last_name, dob, mob_no, address);
        return res.status(201).send({
            success: true,
            message: 'New student record created',
            
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in create student API',
            error
        });
    }
}


//delete student
export const deleteStudent = async (req: Request<UserParams>,res: Response<ApiResponse>,):Promise<Response<ApiResponse>>=>{
    try{
        const studentIdd :string = req.params.id;
        const studentId:number = parseInt(studentIdd)
        const id = await checkId(studentId);
        if(id==0){
            return res.status(400).send({
                success: false,
                message: 'Id mentioned does not exist'
            });
        }
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Please provide id or valid id"
            });
        }
        await deleteData(studentId);
        return res.status(200).send({
            success: true,
            message: "Deleted successfully"
        })
    }
    catch(error){
        return res.status(400).send({
            success: false,
            message: "Error in delete student",
            error
        })
    }
}


//update student
export const updateStudent =async (req: Request,res: Response<ApiResponse>):Promise<Response<ApiResponse>>=>{
    try{
        const studentIDD = req.params.id;
        const studentID:number = parseInt(studentIDD);
        const id = await checkId(studentID);
        
        if(id==0){
            return res.status(400).send({
                success: false,
                message: 'Id mentioned does not exist'
            });   
        }
        if(!studentID){
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide Student id'

            });
        }
        const {first_name, last_name, dob, mob_no, address} = req.body as User;
        await updateData(first_name, last_name, dob, mob_no, address, studentID);

        return res.status(200).send({
            success: true,
            message: 'Student Details Updated'
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in Update student API',
            error
        });
    }
}


export const nextPage = async(req: Request<QueryParams>,res: Response<ApiResponse>):Promise<Response<ApiResponse>>=>{
    const pageNo = parseInt(req.query.pageNo as string);
    const noOfData = parseInt(req.query.noOfData as string);
    const dataFetch = req.query.dataFetch as string;
    const sortType = req.query.sortType as string;
    const colName = req.query.colName as string;
    try{
        const searchTotal = await calcSearchTotal(dataFetch || '');
        const data = await getQuery(pageNo || 1, noOfData || 3,dataFetch || '', sortType || 'desc', colName || 'id');
        
        return res.status(200).send({
            success: true,
            data: data,
            searchTotal: searchTotal,
            
        });
        
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message: 'Error in sort API',
            error
        })
    }
}