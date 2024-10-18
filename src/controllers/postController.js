import cloudinary from "../config/cloudinaryConfig.js";
import { createPostService, getAllPostService } from "../services/postService.js";

export async function createPost(req, res) {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'posts' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(req.file.buffer);
        }); 

        const post = await createPostService({
            image: result.secure_url,
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
            error: 'Error uploading image to Cloudinary'
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