import express from 'express';
import connectDB from "./config/dbConfig.js";
import { createPost } from './controllers/postController.js';
import upload from './config/multerConfig.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get('/ping', (req, res) => {
    // const name = req.params.name;
    // console.log(req.query);
    // console.log(req.body);
    return res.json({Message: "Pong" + " " + name});
});

app.post('/posts', upload.single('image'), createPost);

app.listen(PORT, () => {
    console.log("Server running on http://localhost:",PORT);
    connectDB();
});