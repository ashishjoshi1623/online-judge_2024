import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
{
    username : {
        type: String,
        required : [true, "This field is required"],
        unique : [true, "This username already exist !"],
        lowercase : true,
        trim : true,
        index : true
    },
    password : {
        type : String,
        required : [true, "Password can not be left empty."],
    },
    email : {
        type : string,
        required : [true, "This field is required"],
        unique : [true, "This username already exist !"],
        lowercase : true,
        trim : true,
    }


},{timestamps: true})

// Middleware to make changes just before saving
userSchema.pre("save", async function (next){
    // return next if pass not modified
    if( !this.isModified("password") ) return next();

    // encrypting password to 10 round hashing
    this.password = bcrypt.hash(this.password, 10);
    next();
})

// checks user given password with stored password returns boolean
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User",userSchema);