import mongoose, {Schema} from "mongoose";

const submissionSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
        lastSubmission : {
            type : String
        },
        question : {
            type : Schema.Types.ObjectId,
            ref : "Question"
        }
    },{timestamps : true}
)

export const Submission = mongoose.model("Submission",submissionSchema);