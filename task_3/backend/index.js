const express = require('express');
const dotenv = require("dotenv");
const mySqlPool = require('./config/db');
//const cors = require('cors');


//configure dotenv
dotenv.config();

//object
const app = express();


//middlewares
//app.use(cors());
app.use(express.json());


//routes
app.use('/crud',require("./routes/studentsRoutes"))


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
}).catch((error)=>{
    console.log(error)
});

