import express from "express";
import postRouter from './post.js';
import userRouter from './user.js';
import commentRouter from './comment.js';
import likeRouter from './like.js';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/user', userRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);

export default router;