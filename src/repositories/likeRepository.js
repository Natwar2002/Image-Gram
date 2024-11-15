import Like from "../schema/like.js";

export const createLike = async function (onModel, likeableId, user) {
    try {
        const like = await Like.create({ onModel, user, likeableId });
        return like;
    } catch (error) {
        console.log(error);
    }
}

export const findIfModelAlreadyLiked = async function(user, likeableId, onModel) {
    try {
        const like = await Like.findOne({ user, likeableId, onModel });
        return like;
    } catch (error) {
        console.log(error);
    }
}

export const findLike = async function(likeableId, user) {
    try {
        const like = await Like.findOne({ likeableId, user });
        return like;
    } catch (error) {
        console.log(error);
    }
}


export const removeLike = async function (likeableId, user) {
    try {
        const like = await Like.findOneAndDelete({ user, likeableId });
        return like; 
    } catch (error) {
        console.log(error);
    }
}

export const countLikes = async function (likeableId) {
    const totalLikes = await Like.findOne({ likeableId }).countDocuments();
    return totalLikes;
}