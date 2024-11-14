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
        const comment = await Comment.findById(id).populate("replies").populate("likes");
        return comment;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteComment(commentId) {
    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        return comment;
    } catch (error) {
        console.log(error);   
    }
}

export async function fetchAllCommentsByCommentableId(commentableId) {
    const comments = await Comment.find({ commentableId })
        .populate({
            path: 'userId',
            select: 'username avatar' // populate username and avatar of the comment author
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'userId',
                select: 'username avatar' // populate username and avatar of the reply author
            }
        })
        .exec();

    return comments;
}