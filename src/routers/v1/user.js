import express from "express";
import { getProfile, signup } from "../../controllers/userController.js";
import { validate } from '../../validators/zodValidators.js'
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";

const router = express.Router();

router.get('/profile', getProfile);

// router
router.post('/signup', validate(zodSignupSchema), signup);

export default router;