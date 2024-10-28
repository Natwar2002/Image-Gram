import express from "express";
import upload from "../../config/multerConfig.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidators.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Creates a new post
 *      description: Creates a new post
 * 
 */
router.post('/', isAuthenticated, upload.single('image'), validate(zodPostSchema), createPost);
router.get('/', getAllPosts);
router.delete('/:id', isAuthenticated, deletePost);
router.put('/:id', isAuthenticated, isAdmin, upload.single('image'), updatePost);

export default router;