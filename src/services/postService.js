import { createPost, findAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const image = createPostObject.image;
    const caption = createPostObject.caption?.trim();
    const post = await createPost(caption, image);
    return post;
}

export async function getAllPostService() {
    const post = await findAllPosts();
    return post;
}