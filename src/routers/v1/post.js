import express from "express";
import upload from "../../config/multerConfig.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidators.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', isAuthenticated, upload.single('image'), validate(zodPostSchema), createPost);
router.get('/', getAllPosts);
router.delete('/:id', isAuthenticated, deletePost);
router.put('/:id', upload.single('image'), updatePost);

export default router;