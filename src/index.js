// import mongoose from "mongoose";
// import { DB_NAME } from "./constant";
// import express from "express";
// require('dotenv').config();
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})

connectDB();


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