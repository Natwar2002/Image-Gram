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
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: function(passwordValue) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordValue);
            },
            message: "Please choose a stronger password"
        }
    }
}, { timestamps: true });

const user = mongoose.model("User", userSchema);

export default user;


// // service 
// export async function signInService(user) {
//     try {
//         const user = await findUserByEmail(user.email);

//         if (!user) {
//             throw new Error('User with this email does not exist');
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             throw new Error('Invalid password');
//         }

//         const token = jwt.sign(
//             { id: user._id, username: user.username, email: user.email }, 
//             JWT_SECRET, 
//             { expiresIn: '1h' }
//         );
//     } catch (error) {
//         throw error;
//     }
// }