import express from 'express';
import connectDB from "./db.js"
import cors from 'cors';
import corsOptions from '../routes/cors.js';
import auth from '../routes/auth.js';


const app = express();
const port = 3000;
app.use('/public', express.static('public'));
app.use(express.json())
app.use(cors(corsOptions))

connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
    })
    app.use('/auth', auth)
})