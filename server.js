import express from 'express';
import {connectDb} from './db/dbConnection.js';
const PORT = process.env.PORT||8081;
const server = express();

connectDb("auth1" , "postgres" , "123");
server.listen(PORT , ()=>{
    console.log("server running on port 8081")
})