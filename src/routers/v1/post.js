import express from "express";
import upload from "../../config/multerConfig.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../../controllers/postController.js";
import { validate } from "../../validators/zodValidators.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";

const router = express.Router();

router.post('/', validate(zodPostSchema), upload.single('image'), createPost);
router.get('/', getAllPosts);
router.delete('/:id', deletePost);
router.put('/:id', upload.single('image'), updatePost);

export default router;