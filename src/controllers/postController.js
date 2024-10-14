import cloudinary from "../config/cloudinaryConfig.js";

export async function createPost(req, res) {
    console.log("Inside controller");

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    try {
        const result = cloudinary.uploader.upload_stream({ folder: 'posts'});
        result.end(req.file.buffer);
        console.log(req.file);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: result,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: 'Error uploading image to Cloudinary' 
        });
    }

    // const post = await createPostService({ 
    //     caption: req.body.caption, 
    //     image: req.file.location 
    // });
}