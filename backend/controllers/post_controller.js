import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Post } from "../model/post_model.js";
import { User } from "../model/user_model.js";
export const addNewPost = async(req, res) => {
    try {
        const {content} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image)
            return res.status(400).json({message: "Please upload an image."});
            const optimizedImageBuffer = await sharp(image.buffer)
            .resize({width:800,height:800, fit:'inside'})
            .toFormat('jpeg', {fit:'inside'})
            .toBuffer();
            const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri);
            const post = await Post.create({
                content,
                image: cloudResponse.secure_url,
                author:authorId,
            });
            const user = await User.findById(authorId);
            if(user){
                user.posts.push(post._id);
                await user.save();
            }
            await post.populate({path:'author', select:'-password'});
            return res.status(201).json({
                message: "Post created successfully",
                post,
                success:true,
            });
    } catch (error) {
        console.log(error);
    }
}
export const getAllPost = async (req,res) =>{
    try {
        const post = await post.find().sort({createdAt:-1})
        .populate({path:'author', select:'username, profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt:1},
            populate:{
                path:'author',
                select:'username, profilePicture',
            }
        });
        return res.status(200).json({
            post,
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};
export const getUserPost  = async (req,res) => {
    try {
        const authorId = req.id;
        const post = await (await Post.find({author:authorId})).Sort({author:authorId}).populate({path:'author', select:'username, profilePicture'}).populate({
            path:'comments',
            sort:{createdAt:1},
            populate:{
                path:'author',
                select:'username, profilePicture',
            }
        });
        return res.status(200).json({
            post,
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};
export const likePost = async (req,res) =>{
    try {
        const likeknrewalaUserkiId = req.id;
        const postid = req.params.postid;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message:'post not found',
            success:false,
        });
        await post.updateOne({$addToSet:{likes:likeknrewalaUserkiId}});

        await post.save(); 
        return res.status(200).json({
            message:'Post liked',
            success:true,
        });
    } catch (error) {
        console.log("Error regarding the liking of post:",error);
    }
}
export const dislikePost = async (req,res) =>{
    try {
        const dislikeknrewalaUserkiId = req.id;
        const postid = req.params.postid;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message:'post not found',
            success:false,
        });
        await post.updateOne({$pull:{likes:dislikeknrewalaUserkiId}});

        await post.save(); 
        return res.status(200).json({
            message:'Post disliked',
            success:true,
        });
    } catch (error) {
        
    }
}
export const addComment = async (req,res) =>{
    try {
        const postId = req.params.id;
        const commentkrneWaleUserKiId = req.id;

        const{text} = req.body;
        const post = await Post.findById(postId);
        if (!text) {
            return res.status(400).json({message:'text is required', success:false})
            
        }
        const comment = await Comment.create({
            text,
            authorId:commentkrneWaleUserKiId,
            post:postId
        }).populate({
            path:'author',
            select:'username profilePicture'
        });

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message:'Comment added',
            comment,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getCommentsOfPost = async (req,res) =>{
    try {
        const postId = req.params.id;

        const comments = await Comment.find({post:postId}).populate("author", "username, profilePicture");

        if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});
        return res.status(200).json({comments, success:true});
    } catch (error) {
        console.log(error);
        
    }
};
