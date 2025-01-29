import {User} from "../model/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req, res) =>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:"Something is missing, please check!",
                success:false,
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"Email already exists",
                success:false,
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async(req,res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Something is missing, please check!",
                success:false,
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Email not found",
                success:false,
            });
        }
        const isPasswordMatch = await bcrypt.compareSync(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Invalid password",
                success:false,
            });
        }

        user = {
            _id:user._id,
            username:user.username,
            email:user.email,
            profilePicture:user.profilePicture,
            bio:user.bio,
        };
        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:"30d"});
        return res.cookie('token', token, {httpOnly:true, sameSite:"strict", maxAge: 30*24*60*60*1000}).json({
            message:`Welcome back ${user.username}`,
            success:true,
            user,
        }); 
    } catch (error) {
        console.log(error);
    }
};
export const logout = async (__,res) =>{
    try {
        return res.cookie("token","", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};
export const getProfile = async(req,res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        return res.status(200).json({
            user,
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};
export const editProfile = async(req,res) =>{
    try {
        const userId = req.id;
        const {username,email,bio} = req.body;
        const profilePicture = req.file;
        let cloudResponse;
        if (profilePicture) {
            const fileUri = getDatauri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,
            });
        }
        if(bio) user.bio = bio;
        if(email) user.email = email;
        if(username) user.username = username;
        if(profilePicture) user.profilePicture = cloudResponse.secure_url;
        await user.save();
        return res.status(200).json({
            message:"Profile updated successfully",
            success:true,
            user,
        });

    } catch (error) {
        console.log(error);
    }
}