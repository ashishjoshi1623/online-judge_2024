import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db/index.js";

const app = express();
const port = process.env.PORT || 3000; //port fron .env or 3000

dotenv.config({
    path : '../env'
})

//connecting database
connectDB()

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//http methods
app.get("/",cors(), (req,res)=>{
    res.send("hello");
});

// Post method fetching register credentials
app.post("/api/register",cors(), (req,res)=>{
    console.log(req.body);
    res.json({"message":"user info received"});
});


// Post method fetching login credentials
app.post("/api/login",cors(), (req,res)=>{
    console.log(req.body);
    res.json({"message":"user info received"});
});

//app listening on port :
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
});