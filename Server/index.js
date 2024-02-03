import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";



const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.get("/",cors(), (req,res)=>{
    res.send("hello");
});

app.post("/api/login",cors(), (req,res)=>{
    console.log(req.body);
    res.json({"message":"user info received"});
});

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
});