// import mongoose from "mongoose";
// import { DB_NAME } from "./constant";
import express from "express";
// require('dotenv').config();
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})

const app = express();
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })

    app.on("error", () =>{
                    console.log("Err: ",error);
                    throw error
                })
})
.catch((err) => {
    console.log("Mongo db Connection Failed",err);
})


// const app = express();
// ( async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error", () =>{
//             console.log("Err: ",error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     }catch(error) {
//         console.log("Error : ",error)
//         throw err

//     }
// })(

// )