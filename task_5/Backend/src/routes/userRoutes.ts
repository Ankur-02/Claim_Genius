import express,{Request, Response} from 'express';
import {Router} from 'express';
import { signUp, login, logout, } from '../controllers/userController';



//router object
const router1:Router = express.Router();



//sign up
router1.post('/signup',signUp)

//login
router1.post('/login',login)

router1.post('/logout',logout)






export default router1;