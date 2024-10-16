import cloudinary from "../config/cloudinaryConfig.js";

export async function createPost(req, res) {
    console.log("Inside controller");

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    } else {
        console.log("Req.file", req.file);
    }

    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'posts' },
            (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
                }

                console.log("Secure URL", result.secure_url);

                res.status(201).json({
                    success: true,
                    message: 'Image uploaded successfully',
                    data: result,
                });
            }
        );

        // Sending the file buffer to Cloudinary's upload_stream
        uploadStream.end(req.file.buffer);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error uploading image to Cloudinary'
        });
    }
}
