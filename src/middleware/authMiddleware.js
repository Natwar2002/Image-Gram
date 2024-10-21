// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/serverConfig.js';

// export const authenticateUser = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ error: 'Authentication token is required' });
//     }
//     try {
//         const decodedToken = jwt.verify(token, JWT_SECRET);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }
// };

// // router
// router.post('/', authenticateUser, upload.single('image'), createPost);

// // controller
// export async function createPost(req, res) {
//     try {
//         const result = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//                 { folder: 'posts' },
//                 (error, result) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result);
//                     }
//                 }
//             );
//             stream.end(req.file.buffer);
//         }); 
//         const token = req.headers.authorization?.split(' ')[1];
//         const decodedToken = jwt.verify(token, JWT_SECRET);
//         const post = await createPostService({
//             image: result.secure_url,
//             caption: req.body.caption,
//             createdBy: decodedToken
//         });

//         res.status(201).json({
//             success: true,
//             message: 'Image uploaded successfully',
//             data: post
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: 'Error uploading image to Cloudinary'
//         });
//     }
// }

// // router
// router.delete('/posts/:postId', deletePost);

// // controller
// export const deletePost = async (req, res) => {
//     try {
//         const userDetails = req.user;
//         const postId = req.params.id;
        
//         const post = await findPostByIdService(postId);

//         if (!post) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Post not found'
//             });
//         }

//         if(post.user.toString() == userDetails._id) {
//             await deletePostService(postId);
//             res.status(200).json({
//                 success: true,
//                 message: 'Post deleted successfully'
//             });
//         } else {
//             return res.status(403).json({
//                 success: false,
//                 message: 'You are not authorized to delete this post'
//             });
//         }
//     } catch(e) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting post'
//         });
//     }
// }

// // update post
// export const updatePost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const updatePostObject = req.body;
//         if(req.file) {
//             updatePostObject.image = req.file.location;
//         }
//         const response = await updatePostService(updatePostObject, postId);

//         if (!post) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Post not found'
//             });
//         }

//         // Check if the user owns the post or is an admin
//         if (post.user.toString() !== req.user._id && req.user.role !== 'admin') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'You are not authorized to update this post'
//             });
//         }

//         // If the user is authorized, update the post
//         post.caption = caption || post.caption;
//         post.imageUrl = imageUrl || post.imageUrl;
//         const updatedPost = await post.save();

//         res.status(200).json({
//             success: true,
//             message: 'Post updated successfully',
//             data: updatedPost
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Error updating post'
//         });
//     }
// };

// // service
// export const updatePostService = async (id, updateObject) => {
//     const post = await findPostById(id);
//     if(post.user != user) {
//         throw {
//             status: 401,
//             message: "Unauthorized"
//         }
//     }
//     const response = await updatePostById(id, updateObject);
//     return response;
// }