import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db/index.js";
import { User } from "./models/user.models.js";
import {Admin} from "./models/admin.models.js";
import { ApiError } from "./utils/ApiError.js";
import {ApiResponse} from "./utils/ApiResponse.js"
import {Question} from "./models/question.models.js"
import { generateFile } from "./utils/generateFile.js";
import { executeCpp } from "./utils/executeCpp.js";
import { executeJava } from "./utils/executeJava.js";
import { executePy } from "./utils/executePy.js";
import { Submission } from "./models/submission.models.js";

const app = express();
const port = process.env.PORT || 3000; //port from .env or 3000

//To use .env file
dotenv.config({
    path : '../env'
})

//connecting database
connectDB()

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//http methods
app.get("/",cors(), (req,res)=>{
    res.send("hello");
});

// Post method fetching "Register" credentials
app.post("/api/register",cors(), async (req,res) => {
    // user details from frontend
   const {username, email, password, confirmPassword} = req.body.values;
    //validation completed in frontend
    //console.log(username);

    //check if user already exist in database
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
    console.log(doesUserExist._id);

    //If user exist
    if(doesUserExist){
        // check if password is correct
        const isPassCorrect = await doesUserExist.isPasswordCorrect(password);
        // console.log(isPassCorrect);

        // if password correct send response
        if(isPassCorrect){
            return res.status(201).json(new ApiResponse(201,
                {
                    username : username,
                    userId: doesUserExist._id
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

// Admin Login 
app.post("/api/adminlogin" ,cors(), async (req,res) => {
    // console.log(req.body);
    const {username, password} = req.body;
    
    const isAdmin = await Admin.findOne({username});
        
    if(isAdmin){
        const isPassCorrect = await isAdmin.isPasswordCorrect(password);
        if(isPassCorrect)
            {   
                return res.status(200).json(new ApiResponse(200, 
                    {
                        admin : username
                    },
                    "Admin Login success")) 
            }
            else{
                return res.status(409).json(new ApiResponse(409, {message :"Incorrect Password"},"Incorrect Password"))
            }
           
        }
        return res.status(409).json(new ApiResponse(409, {message :"Incorrect username/Password"},"Incorrect username/Password"))

    
});

// Add question in QuestionSchema
app.post("/api/question",cors(), async (req,res)=>{
    // console.log(req.body);
    const {title, problemStatement, testCases, output} = req.body;

    const isExist = await Question.findOne({title})

    if(isExist){
        return res.sendStatus(409).json(new ApiResponse(409,{message : "Already exist"},"Already exist"));
    }

    //if new entry, create a new database object

    const newEntry = Question.create({
        title,
        problemStatement,
        testCases : [testCases],
        output : [output],
    })

    const isCreated = await Question.findById((await newEntry)._id);

    if(!isCreated){
        throw new ApiError(500,"Something went wrong");
    }

    // console.log(isCreated);

    return res.status(201).json(
        new ApiResponse(201, isCreated, "User registered Successfully")
        )
})

//send questions as response
app.post("/api/allquestions",cors(),async (req,res) => {
    try {
        const question = await Question.find().select("-problemStatement -output -testCases");
        // console.log(question);
        res.json(JSON.stringify(question));
    } catch (error) {
        throw new ApiError(500,"Something went wrong");
    }
    
    // const questionObj = Object.assign({},question);
    
    // console.log(question[1]);
})

//get question Description
app.get("/api/description/:title",cors(),async (req,res)=>{
    const title = req.params.title;
    // console.log(title);
    try {
        const questionDescription = await Question.find({title}).select("-createdAt -updatedAt");
        // console.log(JSON.stringify(questionDescription));
        res.json(JSON.stringify(questionDescription))
    } catch (error) {
        throw new ApiError(500,"Something went wrong");
    }
    

})

//compiler functioning route
app.post("/api/run", cors(), async(req,res) => {
    const { language = 'cpp' , code, title, user, userId, questionId } = req.body;
    // console.log(questionId); //65cb0b1fac1ef2dbf291e3a6
    let testCases = [];
    let finalOutput = [];

    if(code === undefined){
        return res.status(404).json({ success: false, error: "Empty code!" });
    }

    try {
        const test = await Question.find({title}).select("testCases output");
        testCases = test[0].testCases; //[ '2 5' ]
        finalOutput = test[0].output; //[ '7' ]

        // console.log(testCases , finalOutput); //[ '2 5' ] [ '7' ]

    } catch (error) {
        throw new ApiError(500,"Something went wrong with DataBase");
    }

    
        try {
        const filePath = await generateFile(language, code)
        //D:\AlgoUniversity\online-judge\Server\src\utils\codes\1f7c24ba-74d5-47e5-a0c7-ed41687c2d80.cpp

        let output = "";
        let message = [];
        let outputArray = [];

        //for cpp code
        if(language === 'cpp'){
            for(var i = 0; i<testCases.length; i++){
                output = await executeCpp(filePath,testCases[i]);
                outputArray.push(output);

                // If User's answer is correct
                if(output === finalOutput[i]){
                    // console.log("success");
                    message.push(`Testcase ${i+1} Success`);

                    //check if Submission exist
                    const isSubmissionPresent = await Submission.findOne({user : userId, question : questionId});
                    // console.log(isSubmissionPresent);
                    
                    //if submission present then update
                    if(isSubmissionPresent){
                        const update = await isSubmissionPresent.updateOne({lastSubmission : `${code}`});
                        // console.log(update);
                        
                    }
                    else{
                        const newSubmission = await Submission.create(
                            {
                                user : userId,
                                lastSubmission : code,
                                question : questionId
                            }
                        )
                        // console.log(newSubmission);
                    }
                    
                }
                else{
                    message.push(`Testcase ${i+1} Failed`);
                }
            }
            return res.json({output : outputArray,message : message, testCases : testCases, expectedOutput : finalOutput});
        }

            //for java code
        else if(language === 'java'){
            for(var i = 0; i<testCases.length; i++){
                output = await executeJava(filePath,testCases[i]);
                outputArray.push(output);
                if(output === finalOutput[i]){
                    message.push(`Testcase ${i+1} Success`);

                    //check if Submission exist
                    const isSubmissionPresent = await Submission.findOne({user : userId, question : questionId});
                    // console.log(isSubmissionPresent);
                    
                    //if submission present then update
                    if(isSubmissionPresent){
                        const update = await isSubmissionPresent.updateOne({lastSubmission : `${code}`});
                        // console.log(update);
                        
                    }
                    else{
                        const newSubmission = await Submission.create(
                            {
                                user : userId,
                                lastSubmission : code,
                                question : questionId
                            }
                        )
                        // console.log(newSubmission);
                    }
                }
                else{
                    message.push(`Testcase ${i+1} Failed`);
                }   
            }    
            
            return res.json({output : outputArray,message : message, testCases : testCases, expectedOutput : finalOutput});
        }

            //for Python code
        else{
            for(var i = 0; i<testCases.length; i++){
                output = await executePy(filePath,testCases[i]);
                outputArray.push(output);
                // console.log(output);
                // If User's answer is correct
                if(output === finalOutput[i]){
                    message.push(`Testcase ${i+1} Success`);
                    //check if Submission exist
                    const isSubmissionPresent = await Submission.findOne({user : userId, question : questionId});
                    // console.log(isSubmissionPresent);
                    
                    //if submission present then update
                    if(isSubmissionPresent){
                        const update = await isSubmissionPresent.updateOne({lastSubmission : `${code}`});
                        // console.log(update);
                        
                    }
                    else{
                        const newSubmission = await Submission.create(
                            {
                                user : userId,
                                lastSubmission : code,
                                question : questionId
                            }
                        )
                        // console.log(newSubmission);
                    }
                }
                else{
                    message.push(`Testcase ${i+1} Failed`);
                }
            }
            return res.json({output : outputArray ,message : message, testCases : testCases, expectedOutput : finalOutput});
        }

        
    } catch (error) {
        return res.status(500).json({ error: error });
    }

    
})

// send submissions as response if present
app.post("/api/submission", cors(), async(req,res) => {
    const {userId, questionId} = req.body;
    // console.log(req.body);
    const isSubmission = await Submission.find({user : userId, question : questionId}).select("lastSubmission");

    // console.log(isSubmission)
    if(isSubmission){
        res.json(JSON.stringify(isSubmission));
    }
    else{
        res.json({"message" : "No record found"});
    }
})

//app listening on port :
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
});