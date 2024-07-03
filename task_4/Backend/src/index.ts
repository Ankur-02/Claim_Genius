import express from 'express';
import dotenv from 'dotenv';
import mySqlPool from './config/db'
import router from './routes/studentsRoutes'


//configure dotenv
dotenv.config();

//object
const app = express();


//middlewares
app.use(express.json());


//routes
app.use('/crud',router)


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

