import express from 'express';
import connectDB from "./config/dbConfig.js";

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    return res.send("Home");
});

app.get('/ping', (req, res) => {
    return res.json({Message: "Pong"})
});

app.get('/hello', (req, res) => {
    return res.json({Message : "GET: Hello world!"})
});

app.post('/hello', (req, res) => {
    return res.json({Message : "POST: Hello world"})
});



app.listen(PORT, () => {
    console.log("Server running on http://localhost:",PORT);
    connectDB();
});