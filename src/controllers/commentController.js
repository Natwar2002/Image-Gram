import { createCommentService, findCommentByIdService } from '../services/commentService.js';

export async function createComment(req, res) {
    try {
        console.log("Req.body: ", req.body);
        
        const { content, onModel, commentableId } = req.body;
        const response = await createCommentService(content, onModel, commentableId, req.user._id);
        return res.status(201).json({
            success: true,
            messsage: "Comment created successfully",
            date: response
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