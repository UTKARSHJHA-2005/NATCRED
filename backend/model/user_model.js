import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    phone:{type:String,default:""},
    profilePicture:{type:String,default:""},
    bio:{type:String,default:""},
    post:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
    project:[{type:mongoose.Schema.Types.ObjectId, ref:"Project"}],
});
export const User = mongoose.model("User", userSchema);