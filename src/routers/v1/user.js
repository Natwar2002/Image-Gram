import express from "express";
import { getProfile, signup, signin } from "../../controllers/userController.js";
import { validate } from '../../validators/zodValidators.js'
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *  post: 
 *      summary: Signup a new user
 *      description: Signup a new user
 */
router.get('/profile', getProfile);
router.post('/signup', validate(zodSignupSchema), signup);
router.post('/signin', validate(zodSigninSchema), signin);

export default router;