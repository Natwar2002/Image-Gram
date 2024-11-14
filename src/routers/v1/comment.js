import express from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createComment, deleteComment, getAllCommentsOnPost, getCommentById } from '../../controllers/commentController.js';

const router =  express.Router();

router.post('/', isAuthenticated, createComment);
router.get('/:id', isAuthenticated, getCommentById);
router.delete('/:id', isAuthenticated, deleteComment);
router.get('/posts/:id', isAuthenticated, getAllCommentsOnPost);

export default router;