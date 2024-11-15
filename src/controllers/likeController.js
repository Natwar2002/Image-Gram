import { createLikeService, removeLikeService } from "../services/likeService.js";

export async function createLike(req, res) {
    try {
        const { likeableId, onModel} = req.body;
        const response = await createLikeService(onModel, likeableId, req.user._id);
        return res.status(201).json({
            success: true,
            message: "Liked",
            data: response
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}

export async function removeLike(req, res) {
    try {
        const { likeableId, onModel } = req.body;
        const response = await removeLikeService(likeableId, onModel, req.user._id);
        return res.status(200).json({
            success: true,
            message: "Like removed",
            data: response
        })
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