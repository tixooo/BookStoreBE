import express from 'express';
const router = express.Router()
import News from '../models/News.js';

router.get('/news', async (req, res) => {
    try {
        const news = await News.find()
        res.json(news)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router