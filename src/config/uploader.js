import cloudinary from "./cloudinaryConfig.js";

export const uploadToCloudinary = (fileBuffer, folder = 'posts') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        
        stream.end(fileBuffer);
    });
}