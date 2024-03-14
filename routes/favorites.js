import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.body.bookId;
        await User.findByIdAndUpdate(userId, { $addToSet: { favoriteBooks: bookId } });
        res.status(200).json({ message: 'Book added to favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/remove', async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.body.bookId;
        await User.findByIdAndUpdate(userId, { $pull: { favoriteBooks: bookId } });
        res.status(200).json({ message: 'Book removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('favoriteBooks');
        res.status(200).json(user.favoriteBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;