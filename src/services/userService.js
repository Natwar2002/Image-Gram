import { createUser } from "../repositories/userRepository.js";

export async function signupService(user) {
    const newUser = await  createUser(user);
    return newUser;
}

export async function signInService(user) {
    
}