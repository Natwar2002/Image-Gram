import { countAllPost, createPost, findAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const image = createPostObject.image;
    const caption = createPostObject.caption?.trim();
    const post = await createPost(caption, image);
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