import { createComment, findCommentById, } from '../repositories/commentRepository.js';
import { findPostById } from '../repositories/postRepository.js';

export const createCommentService = async (content, onModel, commentableId, userId) => {
    try {
        let parent = await fetchCommentParent(onModel, commentableId);
        if (!parent) {
            throw {
                status: 404,
                message: `${onModel} not found`,
            }
        }
        console.log("Parent: ", parent);
        
        const newComment = await createComment(content, onModel, userId, commentableId);
        await addChildCommentToParent(onModel, newComment, parent);
        return newComment;
    } catch (error) {
        console.log(error);
    }
}

export const findCommentByIdService = async (commentId) => {
    try {
        const comment = await findCommentById(commentId);
        if (!comment) {
            throw {
                message: "Comment not found",
                status: 404,
            };
        }
        return comment;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCommentParent = async (onModel, commentableId) => {
        try {
            let parent;
            if (onModel === "Post") {
                parent = await findPostById(commentableId);
            } else if (onModel === "Comment") {
                parent = await findCommentById(commentableId);
            }
            return parent;
        } catch (error) {
            console.log(error);
        }
    }

export const addChildCommentToParent = async (onModel, newComment, parent) => {
    try {
        if (onModel == "Post") {
            parent.comments.push(newComment._id);
        } else if (onModel == "Comment") {
            parent.replies.push(newComment._id);
        }
        await parent.save();
    } catch (error) {
        console.log(error);
    }
}