import { signupService, singinService } from "../services/userService.js";

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
            message: 'User created successfully',
            data: newUser,
        });
    } catch (error) {
        if(error.status) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: 'Signup failed due to internal server error',
        });
    }
}

export async function signin(req, res) {
    try {
        const response = await singinService(req.body);
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: response,
        })
    } catch (error) {
        if(error.status) {
            res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}