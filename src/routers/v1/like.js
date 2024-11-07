import express from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createLike, removeLike } from '../../controllers/likeController.js';

const router =  express.Router();

router.post('/', isAuthenticated, createLike);
router.delete('/', isAuthenticated, removeLike);

export default router;