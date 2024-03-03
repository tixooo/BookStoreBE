import express from 'express';
import Book from '../models/Book.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router