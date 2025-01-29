import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    content:{type:String, default:''},
    image:{type:String, default:''},
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    authorAvatar:{type:String, default:"", ref:"User"},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}],
},{timestamps:true});
export const Post = mongoose.model("Post", postSchema);