import { findCommentById } from "../repositories/commentRepository.js";
import { createLike, findIfModelAlreadyLiked, findLike, removeLike } from "../repositories/likeRepository.js";
import { findPostById } from "../repositories/postRepository.js";

export async function createLikeService (onModel, likeableId, user) {
    try {
        const parent = await fetchLikeParent(onModel, likeableId);
        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not found`,
            }
        }

        const like = await findIfModelAlreadyLiked(user, likeableId, onModel);  
        if(like) {
            throw {
                status: 400,
                message: `${onModel} is already liked`
            }
        } 
        const newLike = await createLike(onModel, likeableId, user);
        await addLikeToParent(newLike, parent);
        return newLike;
    } catch (error) {
        console.log(error);
    }
}

export async function removeLikeService(likeableId, onModel, user) {
    try {
        const like = await findLike(likeableId, onModel, user);

        if(!like) {
            throw {
                status: 404,
                message: "Like not found"
            }
        }
        await removeLike(likeableId, user);
        return like;
    } catch (error) {
        console.log(error);
    }
}

export const fetchLikeParent = async (onModel, likeableId) => {
    try {
        let parent;
        if (onModel === "Post") {
            parent = await findPostById(likeableId);
        } else if (onModel === "Comment") {
            parent = await findCommentById(likeableId);
        }
        return parent;
    } catch (error) {
        console.log(error);
    }
}

export const addLikeToParent = async (newLike, parent) => {
    try {
        parent.likes.push(newLike._id);
        await parent.save();
    } catch (error) {
        console.log(error);
    }
}