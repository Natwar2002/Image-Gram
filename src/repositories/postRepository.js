import Post from "../schema/post.js";

export const createPost = async (caption, image) => {
    try {
        const newPost = await Post.create({ caption, image });
        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export const findAllPosts = async (offset, limit) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).skip(offset).limit(limit);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

export const countAllPost = async () => {
    try {
        const count = await Post.countDocuments();
        return count;
    } catch (error) {
        console.log(error);
    }
}

export const findPostById = async (id) => {
    try {
        const post = await Post.findOne(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}

export const deletePostById = async (id) => {
    try {
        const post = await Post.findByIdAndDelete(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}