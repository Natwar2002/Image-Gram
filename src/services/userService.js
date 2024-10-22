import { createUser } from "../repositories/userRepository.js";

export async function signupService(user) {
    try {
        const newUser = await  createUser(user);
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