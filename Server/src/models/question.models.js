import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    problemStatement : {
        type : String,
        required : true
    },
    testCases : [
        {
            type : String,
            required : true
        }
    ],
    output : [
        {
            type : String,
            required : true
        }
    ],
    difficulty : {
        type : String,
        required : true,
        enum : ["easy", "medium", "hard"]
    }
},{timestamps: true})

export const Question = mongoose.model("Question",questionSchema);