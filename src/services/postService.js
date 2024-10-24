import { countAllPost, createPost, deletePostById, findAllPosts, findPostById, updatePostById } from "../repositories/postRepository.js";

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

export async function deletePostService(id, user) {
    const post = await findPostById(id);
    if(!post) {
        throw{
            status: 404,
            message: "Post not found"
        }
    }
    if(post.user != user) {
        throw{
            status: 401,
            message: "Unauthorized"
        }
    }

    const response = await deletePostById(id);
    return response;
}

export async function updatePostService(id, updateObject) {
    const updatedPost = await updatePostById(id, updateObject);
    return updatedPost;
}

export async function findPostService(id) {
    const post = findPostById(id);
    return post;
}