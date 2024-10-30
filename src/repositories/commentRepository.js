import Comment from "../schema/comment.js";

export async function createComment(content, onModel, userId, commentableId) {
    try {
        const comment = await Comment.create({ content, onModel, userId, commentableId, likes: [], replies: [] });
        return comment;
    } catch (error) {
        console.log(error);
    }
}

export async function findCommentById(id) {
    try {
        const comment = await Comment.findById(id).populate("replies");
        return comment;
    } catch (error) {
        console.log(error);
    }
}