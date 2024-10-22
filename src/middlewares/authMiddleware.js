import { checkIfUserExist } from "../services/userService.js";
import { verifyJWT } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        return res.status(400).json({
            success: false,
            message: "Token is required",
        });
    }

    try {
        const response = verifyJWT(token);

        const doesUserExist = await checkIfUserExist(response.email);
        if(!doesUserExist) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = response;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
}