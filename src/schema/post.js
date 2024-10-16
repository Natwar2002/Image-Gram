import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", 
    //     required: true
    // }
}, { timestamps: true });

const post = mongoose.model("Post", postSchema);

export default post;