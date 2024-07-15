import {Request, Response} from 'express';
import {putUser, getUser, checkAccount} from "../services/userQueries";
import type {LoginUser} from '../types/type';
import jwt from 'jsonwebtoken';





export const signUp = async(req: Request,res: Response)=>{
    try{
        const {name, email, password} = req.body as LoginUser;
        if(!name || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const data = await checkAccount(email);
        
        if(data.length){
            return res.status(400).send({
                success: false,
                message: 'Account already exist',
                
            });
        }else{
            await putUser(name, email, password);
            return res.status(201).send({
                success: true,
                message: 'New account created',
                
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in sign up API',
            error
        });
    }
}


//login
export const login = async(req: Request,res: Response)=>{
    try{
        const {email, password} = req.body as LoginUser;
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const data = await getUser(email, password);
        if(data.length){
            const data1=data[0]
            const secret = process.env.secret || '';
            
            jwt.sign({data1}, secret, {expiresIn:'1h'}, (err, token)=>{
                res.cookie("authorization", token,{
                    httpOnly: true,
                })
                return res.status(200).json({
                    success: true,
                    message: 'Account Found. Login Successfull',
                    token
                }); 
            })
        }
        else{
            res.clearCookie("authorization");
            return res.status(200).json({
                success: false,
                message: 'Account Not Found. Login Unsuccessfull',
                
            });
        }
        
    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in login API',
            error
        });
    }
}


export const logout = async (req: Request,res: Response) =>{
    try{
        res.clearCookie("authorization")
        res.status(200).send({
            success:true,
            message:"Logged Out Successfuly"
        })
    }catch(error){
        res.status(400).send({
            success:false,
            message: "Error in Logout"
        })
    }
}


