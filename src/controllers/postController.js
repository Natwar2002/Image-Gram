import { uploadToCloudinary } from "../config/uploader.js";
import { createPostService, deletePostService, getAllPostService, updatePostService } from "../services/postService.js";

export async function createPost(req, res) {
    try {
        const imageUrl = await uploadToCloudinary(req.file.buffer, "posts");

        const post = await createPostService({
            image: imageUrl,
            caption: req.body.caption
        });

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: post
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error uploading image to Cloudinary'
        });
    }
}

export async function getAllPosts (req, res) {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const posts = await getAllPostService(offset, limit);
        
        return res.status(200).json({
            success: true,
            message: 'All posts fetched successfully',
            data: posts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const post = await deletePostService(postId);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: post
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export async function updatePost(req, res) {
    console.log("req file" + req.file);
    
    try {
        const updateObject = req.body;
        if(req.file) {
            updateObject.image = await uploadToCloudinary(req.file.buffer);
        }
        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: response
        });
    } catch (error) {
        console.log(error);
    }
}