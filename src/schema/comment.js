import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 1,
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "onModel",
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like",
        }
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ]
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;