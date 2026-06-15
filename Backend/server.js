import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { generateResponse } from "./APIcall.js";
import connectDB from "./utils/Databaseconn.js"

import chatRoute from "./routes/chat.js"

import aiRoute from "./utils/openai.js"

const app=express();
dotenv.config();
const port =3000;
app.use(express.json());
app.use(cors());




app.use("/api",chatRoute);


app.use("/ai",aiRoute);




app.listen(port,()=>{
  connectDB();
  console.log(`Server is running at port ${port}`);
})