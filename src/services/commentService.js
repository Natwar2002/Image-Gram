import { createComment, deleteComment, fetchAllCommentsByCommentableId, findCommentById, } from '../repositories/commentRepository.js';
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
        
        const newComment = await createComment(content, onModel, userId, commentableId);
        await addChildCommentToParent(onModel, newComment, parent);
        if (onModel === "Comment") {
            const topLevelParent = await findTopLevelParent(commentableId);
            if (topLevelParent) {
                await addCommentToTopLevelParent(newComment, topLevelParent);
            }
        }
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

export const findTopLevelParent = async (commentableId) => {
    let currentComment = await findCommentById(commentableId);
    while (currentComment && currentComment.onModel === "Comment") {
        currentComment = await findCommentById(currentComment.commentableId);
    }
    return currentComment;
};

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

export const addCommentToTopLevelParent = async (newComment, topLevelParent) => {
    try {
        topLevelParent.replies.push(newComment._id);
        await topLevelParent.save();
    } catch (error) {
        console.log(error);
    }
};

export const deleteCommentService = async (commentId, userId) => {
    try {
        const comment = await findCommentById(commentId);
        if(!comment) {
            throw {
                status: 404,
                message: "Comment not found"
            }
        }

        if (comment.user.userId.toString !== userId.toString()) {
            throw {
                status: 401,
                message: "Unauthorized"
            }
        }

        if(comment.replies && comment.replies.length > 0) {
            for(const replyId of comment.replies) {
                await deleteComment(replyId);
            }
        }

        await deleteComment(commentId);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export const getAllCommentsOnPostService = async function(commentableId) {
    try {
        const comments = fetchAllCommentsByCommentableId(commentableId);
        return comments;
    } catch (error) {
        console.log(error);
    }
}