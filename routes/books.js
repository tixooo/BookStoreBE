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

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

router.post('/', async (req, res) => {
    const {title, author, description, publisher, image, price, discountedPrice, topSelling} = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            description,
            publisher,
            image,
            price,
            discountedPrice,
            topSelling
        })
        await newBook.save()
        res.status(201).json({message: 'Book created successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router