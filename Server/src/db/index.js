import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected ! DB HOST : ${connectionInstance.connection.host}`);
    } catch(error){
        console.log("MongoDB connection error : ", error);
        process.exit(1);
    }
}

export default connectDB