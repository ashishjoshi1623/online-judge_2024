import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./src/db/index.js";
import { User } from "./src/models/user.models.js";
import {Admin} from "./src/models/admin.models.js";
import { ApiError } from "./src/utils/ApiError.js";
import {ApiResponse} from "./src/utils/ApiResponse.js"
import {Question} from "./src/models/question.models.js"
import { generateFile } from "./src/utils/generateFile.js";
import { executeCpp } from "./src/utils/executeCpp.js";
import { executeJava } from "./src/utils/executeJava.js";
import { executePy } from "./src/utils/executePy.js";
import { Submission } from "./src/models/submission.models.js";
import { Contact } from "./src/models/contact.models.js";

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
    // console.log(doesUserExist._id);

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
    const {title, problemStatement, testCases, output, difficulty} = req.body;

    let outputArray = output.split(',');
    let testCasesArray = testCases.split(',');

    const isExist = await Question.findOne({title})

    if(isExist){
        return res.sendStatus(409).json(new ApiResponse(409,{message : "Already exist"},"Already exist"));
    }

    //if new entry, create a new database object

    const newEntry = Question.create({
        title,
        problemStatement,
        testCases : testCasesArray,
        output : outputArray,
        difficulty
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
app.post("/api/submit", cors(), async(req,res) => {
    const { language = 'cpp' , code, title, user, userId, questionId} = req.body;
    let testCases = [];
    let finalOutput = [];

    if(code === undefined){
        return res.status(404).json({ success: false, error: "Empty code!" });
    }

    try {
        const test = await Question.find({title}).select("testCases output");
        testCases = test[0].testCases; //[ '2 5' ]
        finalOutput = test[0].output; //[ '7' ]
    } catch (error) {
        throw new ApiError(500,"Something went wrong with DataBase");
    }
        try {
        const filePath = await generateFile(language, code)
        //D:\AlgoUniversity\online-judge\Server\src\utils\codes\1f7c24ba-74d5-47e5-a0c7-ed41687c2d80.cpp

        let output = "";
        let message = [];

        //for cpp code
        if(language === 'cpp'){
            for(var i = 0; i<testCases.length; i++){
                output = await executeCpp(filePath,testCases[i]);

                // If User's answer is correct
                if(output === finalOutput[i]){
                    // console.log("success");
                    message.push(`Testcase ${i+1} Success`);

                    //check if Submission exist
                    const isSubmissionPresent = await Submission.findOne({user : userId, question : questionId});
                    
                    //if submission present then update
                    if(isSubmissionPresent){
                        const update = await isSubmissionPresent.updateOne({lastSubmission : `${code}`});
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
            return res.json({message : message});
        }

        //for java code
        else if(language === 'java'){
            for(var i = 0; i<testCases.length; i++){
                output = await executeJava(filePath,testCases[i]);
                if(output === finalOutput[i]){
                    message.push(`Testcase ${i+1} Success`);

                    //check if Submission exist
                    const isSubmissionPresent = await Submission.findOne({user : userId, question : questionId});
                    // console.log(isSubmissionPresent);
                    
                    //if submission present then update
                    if(isSubmissionPresent){
                        const update = await isSubmissionPresent.updateOne({lastSubmission : `${code}`});
                    }
                    else{
                        const newSubmission = await Submission.create(
                            {
                                user : userId,
                                lastSubmission : code,
                                question : questionId
                            }
                        )
                    }
                }
                else{
                    message.push(`Testcase ${i+1} Failed`);
                }   
            }    
            
            return res.json({message : message});
        }

        //for Python code
        else{
            for(var i = 0; i<testCases.length; i++){
                output = await executePy(filePath,testCases[i]);
                // If User's answer is correct
                if(output === finalOutput[i]){
                    message.push(`Testcase ${i+1} Success`);

                    //check if Submission exist
                    const isSubmissionPresent = await Submission.findOne({user : userId, question : questionId});

                    //if submission present then update
                    if(isSubmissionPresent){
                        const update = await isSubmissionPresent.updateOne({lastSubmission : `${code}`});
                    }
                    else{
                        const newSubmission = await Submission.create(
                            {
                                user : userId,
                                lastSubmission : code,
                                question : questionId
                            }
                        )
                    }
                }
                else{
                    message.push(`Testcase ${i+1} Failed`);
                }
            }
            return res.json({message : message});
        }

        
    } catch (error) {
        return res.status(500).json({ error: error });
    }

    
})

//custom I/O 
app.post("/api/run", cors(), async(req,res) => {
    const { language = 'cpp' , code, customInput } = req.body;
    // console.log(customInput);

    if(code === undefined){
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    
        try {
        const filePath = await generateFile(language, code)
        //D:\AlgoUniversity\online-judge\Server\src\utils\codes\1f7c24ba-74d5-47e5-a0c7-ed41687c2d80.cpp

        let output = "";
        let outputArray = [];

        //for cpp code
        if(language === 'cpp'){
            
            output = await executeCpp(filePath,customInput);
            return res.json({output : output});
        }

        //for java code
        else if(language === 'java'){
            output = await executeJava(filePath,customInput);
            return res.json({output : output});
        }

        //for Python code
        else{
    
            output = await executePy(filePath,customInput);
            return res.json({output : output});
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

app.post("/api/contactquery", cors(), async(req,res) => {
    const {contactQuery, personalEmail} = req.body;
    // console.log(req.body);

    if(!contactQuery || !personalEmail){
        return res.status(404).json({"message" :"details not found"});
    }

    else{
        const submitToDatabase = await Contact.create({contactQuery, personalEmail});
        
        console.log(submitToDatabase);
    }
    

})

// changing content of questions
app.put("/api/editquestions", cors(), async(req,res) => {
    const { title, difficulty, problemStatement, output, testCases } = req.body;
    let outputArray = output.split(',');
    let testCasesArray = testCases.split(',');

    try {
        const findQuestion = await Question.findOneAndUpdate(
            { title: title },
            {
                title: title,
                difficulty: difficulty,
                problemStatement: problemStatement,
                output: outputArray,
                testCases: testCasesArray
            }
        );

        if (!findQuestion) {
            throw new ApiError(500, "Something went wrong");
        }

        console.log(findQuestion);
        res.status(200).json({ message: "successfully updated data" });
    } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//delete question from database

app.delete("/api/deletequestion", cors(), async(req,res) => {
    const { title, _id } = req.query;
    try {
        const findQuestion = await Question.findOneAndDelete({ title: title });

        if (!findQuestion) {
            throw new ApiError(500, "Something went wrong");
        }

        console.log(findQuestion);
        res.status(200).json({ message: "successfully deleted data" });
    } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//app listening on port :
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
});