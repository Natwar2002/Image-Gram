import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt.js";

export async function signupService(user) {
    try {
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        if(error.name === "MongoServerError" && error.code === 11000) {
            throw{
                status: 400,
                message: "User with the email or username already exist."
            }
        }
        throw error;
    }
}

export async function checkIfUserExist(email) {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}

export async function singinService(userDetails) {
    try {
        const user = await findUserByEmail(userDetails.email);
        if(!user) {
            throw{
                status: 400,
                message: "User not found"
            }
        }
        
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid) {
            throw{
                status: 401,
                message: "Invalid password"
            }
        }
        const token = generateJwtToken({ email: user.email, _id: user._id, username: user.username, role: user.role || "user" });
        return token;
    } catch (error) {
        throw error;
    }
}