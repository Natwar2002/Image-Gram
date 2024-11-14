import express from 'express';
import connectDB from "./config/dbConfig.js";
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './utils/swaggerOptions.js';
import cors from 'cors';

const PORT = 3000;

const app = express();

const corsOptions = {
    origin: '*', // Replace '*' with specific origins, e.g., ['http://localhost:3000', 'https://yourdomain.com']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    credentials: true, // Enable if needed (for cookies, authorization headers)
};

app.use(cors(corsOptions));
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