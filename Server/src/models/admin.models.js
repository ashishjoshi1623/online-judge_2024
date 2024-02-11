import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true})

adminSchema.pre("save", async function (next){
    // return next if pass not modified
    if(!this.isModified("password")) return next();

    //encrypt password to 10 round hashing
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// checks user given password with stored password, returns boolean

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


export const Admin = mongoose.model("Admin",adminSchema);