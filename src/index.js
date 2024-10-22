import express from 'express';
import connectDB from "./config/dbConfig.js";
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';

const PORT = 3000;

const app = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/ping', isAuthenticated, (req, res) => {
    // const name = req.params.name;
    // console.log(req.query);
    // console.log(req.body);
    return res.json({ Message: "Pong" });
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:", PORT);
    connectDB();
});