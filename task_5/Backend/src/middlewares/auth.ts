import jwt from 'jsonwebtoken'
import {LoginUser} from '../types/type'
import {Request, Response, NextFunction} from 'express';



export function verifyToken(req:Request, res:Response, next:NextFunction) {
    const login_user  = {
        email:'',
        password:''
    } as LoginUser;
    const secret = process.env.secret || '';
    const token = req.cookies['authorization'];
    if (!token){
        return res.status(401).send({
            success:false,
            message:"Token Not Found"
        })
    }
    else{
        try{
            const d_token = jwt.verify(token, secret)
            req.body.d_token = d_token;
            next();
        }catch(error){
            return res.status(403).send({
                success:false,
                message: "Token is not Valid"
            })
        }
    }
}

