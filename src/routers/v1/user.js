import express from "express";
import { getProfile, signup } from "../../controllers/userController.js";

const router = express.Router();

router.get('/profile', getProfile);

// router
router.post('/signup', signup);

export default router;