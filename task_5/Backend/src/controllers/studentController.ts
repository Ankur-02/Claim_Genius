
import {putData, deleteData, updateData, checkId, calcSearchTotal, getQuery, putImage, getImage,updateImage} from "../services/queries"
import {Request, Response} from 'express';
import type {ApiResponse, User, QueryParams, UserParams} from '../types/type'
import dotenv from 'dotenv';

//configure dotenv
dotenv.config();


//insert student
export const addStudents = async(req: Request,res: Response<ApiResponse>):Promise<Response<ApiResponse>>=>{
    try{
        const {first_name, last_name, dob, mob_no, address} = req.body as User;
        // const myFile = req.file?.filename;
        // const myFile = req.file?.buffer;
        
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
export const deleteStudent = async (req: Request/*<UserParams>*/,res: Response<ApiResponse>,):Promise<Response<ApiResponse>>=>{
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
        // console.log(data[0].myFile);
        
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
            message: 'Error in fetch records API',
            error
        })
    }
}





export const insert_img = async(req:Request, res:Response)=>{
    try{
        const token = req.cookies['authorization'];
        const images  = req.files as Express.Multer.File[];
        
        let multiple_images=''
        if(!images){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        else{
            const parseJwt = (token:string|undefined) => {
                try {
                    if(token)
                  return JSON.parse(atob(token.split('.')[1]));
                } catch (e) {
                  return null;
                }
            };
            const id = parseJwt(token);
            //query
            const data = await getImage(id.data1.user_id);

            //update
            if(data.length){
                multiple_images=data[0].image
            }
            //insert
            for (const imagee of images){
                multiple_images = multiple_images + imagee.filename +',';
            }
            if(data.length){
                await updateImage(id.data1.user_id,multiple_images)
            }
            else{
                await putImage(id.data1.user_id, multiple_images);
            }
            return res.status(201).send({
                success: true,
                message: 'Image/s uploaded successfully!'    
            });
        }
    } catch(error){
        console.log(error);
        
        return res.status(400).send({
            success:false,
            message: "Error in upload Image API"
        })
    }
}



export const get_images = async(req:Request, res:Response)=>{
    try{
        const token = req.cookies['authorization'];
        const id = req.body.d_token.data1.user_id;
        
        if(!id){
            return res.status(404).send({
                success: false,
                message: 'Invalid Id or Provide user id properly'

            });
        }
        const data = await getImage(id)
        
        let data11 = []
        for(let i=0; i<data.length;i++){
            data11.push(data[i].image.split(',').slice(0, -1));

        }
        let data2:string[] = []
        for(let i=0; i<data11.length;i++){
            data2.push(...data11[i])
        }
        for(let i =0;i<data2.length;i++){
            data2[i]=`http://localhost:${process.env.PORT}/image/`+data2[i];
        }
        return res.status(200).send({
            success: true,
            message : "Successfully fetched Users",
            data: data2
        })
        
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in Get Image API',
            error
        });
    }
}