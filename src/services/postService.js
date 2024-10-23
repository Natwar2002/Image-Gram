import { countAllPost, createPost, deletePostById, findAllPosts, updatePostById } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const image = createPostObject.image;
    const caption = createPostObject.caption?.trim();
    const user = createPostObject.user;
    const post = await createPost(caption, image, user);
    return post;
}

export async function getAllPostService(offset, limit) {
    const posts = await findAllPosts(offset, limit);
    const totalDocuments = await countAllPost();

    const totalPages = Math.ceil(totalDocuments/limit);
    return {
        posts, totalDocuments, totalPages
    }
}

export async function deletePostService(id) {
    const post = await deletePostById(id);
    return post;
}

export async function updatePostService(id, updateObject) {
    const updatedPost = await updatePostById(id, updateObject);
    return updatedPost;
}