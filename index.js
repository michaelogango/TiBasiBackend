
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import Users from './routes/Users.js';

const app=express()
app.use(cors());
const PORT=3000
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use('/users',Users)
// connect mongo 
const CONNECTION_URL = 'mongodb+srv://odhis101:natasha12@cluster0.r1d9hq1.mongodb.net/tibasi?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));