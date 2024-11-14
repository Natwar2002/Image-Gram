import { createCommentService, deleteCommentService, findCommentByIdService, getAllCommentsOnPostService } from '../services/commentService.js';

export async function createComment(req, res) {
    try {
        const { content, onModel, commentableId } = req.body;
        
        const response = await createCommentService(content, onModel, commentableId, req.user._id);
        return res.status(201).json({
            success: true,
            messsage: "Comment created successfully",
            data: response
        });
    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            messsage: "Internal server error",
        });
    }
}

export async function getCommentById(req, res) {
    try {
        const commentId = req.params.id;
        const response = await findCommentByIdService(commentId);
        return res.status(200).json({
            success: true,
            message: "Comment found successfully",
            data: response,
        })
    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export async function deleteComment(req, res) {
    try {
        const userId = req.user._id;
        const commentId = req.params.id;
        const response = await deleteCommentService(commentId, userId);
        if(response) {
            return res.status(200).json({
                success: true,
                message: "Comment deleted successfully"
            });
        }
    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export async function getAllCommentsOnPost(req, res) {
    try {
        const commentableId = req.params.id;
        const response = await getAllCommentsOnPostService(commentableId);
        return res.status(200).json({
            success: true,
            message: "Comments found successfully",
            data: response,
        });
    } catch (error) {
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}