import express from 'express';
import dotenv from 'dotenv';
import mySqlPool from './config/db';
import router from './routes/studentsRoutes';
import router1 from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import path from 'path';



//configure dotenv
dotenv.config();

//object
const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/crud',router);
app.use('/user',router1);
app.use('/image', express.static(path.join(__dirname,'../src/','image')));

//port
const PORT = process.env.PORT || 8000;

//conditionally listen
mySqlPool
.query('SELECT 1')
.then(()=>{
    //mysql
    console.log("MySQL db connected")
    //listen
    app.listen(PORT,()=>{
        console.log(`Server Running on ${PORT}`);
})
}).catch((error:string)=>{
    console.log(error)
});

