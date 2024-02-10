import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db/index.js";
import { User } from "./models/user.models.js";
import { ApiError } from "./utils/ApiError.js";
import {ApiResponse} from "./utils/ApiResponse.js"

const app = express();
const port = process.env.PORT || 3000; //port from .env or 3000

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



// Post method fetching "Register" credentials
app.post("/api/register",cors(), async (req,res) => {

    // user details from frontend
   const {username, email, password, confirmPassword} = req.body.values;
    //validation completed in frontend
//    console.log(username);

// check if user already exist in database
    const existingUser = await User.findOne({
        $or : [{username},{email}]
    })

    if(existingUser){
        // throw new ApiError(409,"User already exist, please login !");
        return res.status(409).json(
        new ApiResponse(409, {message : "User already exist, please login !"} , "User already exist, please login !")
        )
    }

        //create an object and push into database
        const newUser = await User.create({
            username: username.toLowerCase(),
            password,
            email,
        })

        const isUserCreated = await User.findById(newUser._id).select("-password");

        if(!isUserCreated){
            throw new ApiError(500,"Something went wrong");
        }
        console.log(isUserCreated);

        return res.status(201).json(
        new ApiResponse(201, isUserCreated, "User registered Successfully")
        )


});


// Post method fetching "Login" credentials
app.post("/api/login",cors(), async (req,res)=>{
    const {username , password } = req.body.loginUserData;
    // console.log(username , password);

    // change password to hash code for matching
    const doesUserExist = await User.findOne( { username } );
    console.log(doesUserExist);

    //If user exist
    if(doesUserExist){

        // check if password is correct
        const isPassCorrect = await doesUserExist.isPasswordCorrect(password);
        console.log(isPassCorrect);

        // if password correct send response
        if(isPassCorrect){
            return res.status(201).json(new ApiResponse(201,
                {
                    username : username
                }, "User Logged In Successfully"))
        }
        // If Password not correct send response
        else{
            return res.status(409).json(
        new ApiResponse(409, {message : "password is incorrect !"} , "password is incorrect !")
        )
        }
    }

    // If user does not exist send response
    return res.status(409).json(
        new ApiResponse(409, {message : "username or password is incorrect !"} , "username or password is incorrect !")
        )
});

//app listening on port :
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
});