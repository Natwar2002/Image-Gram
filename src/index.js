import express from 'express';
import connectDB from "./config/dbConfig.js";
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './utils/swaggerOptions.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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