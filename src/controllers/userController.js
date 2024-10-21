import { signupService } from "../services/userService.js";

export async function getProfile(req, res) {
    // return unimplemented
    return res.status(501).json({
        success: false,
        message: "Not implemented"
    });
}

export async function signup(req, res) {
    try {
        const newUser = await signupService(req.body);
        res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUserre.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Signup failed. ' ,
        });
    }
}