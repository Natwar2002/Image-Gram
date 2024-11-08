import { countAllPost, createPost, deletePostById, findAllPosts, findPostById, updatePostById } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const image = createPostObject.image;
    const caption = createPostObject.caption?.trim();
    const user = createPostObject.user;
    const post = await createPost(caption, image, user);
    return post;
}

export async function getAllPostService(offset, limit) {
    const post = await findAllPosts(offset, limit);
    const totalDocuments = await countAllPost();

    const posts = post.map(post => {
        const totalComments = countCommentsAndReplies(post.comments);
        return { ...post.toObject(), totalComments };
    });

    const totalPages = Math.ceil(totalDocuments/limit);
    return {
        posts, totalDocuments, totalPages
    }
}

const countCommentsAndReplies = (comments) => {
    let total = comments.length;

    comments.forEach(comment => {
        if (comment.replies && comment.replies.length > 0) {
            total += countCommentsAndReplies(comment.replies);
        }
    });
    return total;
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