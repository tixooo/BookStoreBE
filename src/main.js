import express from 'express';
import connectDB from "./db";
import cors from 'cors';
import dotenv from 'dotenv';
import corsOptions from '/routes/cors.js';


const app = express();
const port = process.env.PORT || 3000;

app.use((req,res,next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    next();
})
app.use('/public', express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());
app.use()
connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
    })
    app.use()
})