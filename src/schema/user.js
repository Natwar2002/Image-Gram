import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
}, { timestamps: true });

const user = mongoose.model("User", userSchema);

export default user;