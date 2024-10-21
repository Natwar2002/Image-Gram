import User from "../schema/user.js";

export const findUserByEmail = async function (email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
    }
}

export async function createUser(user) {
    try {
        const newUser = User.create(user);
        return newUser;
    } catch (error) {
        console.log(error);
    }
}