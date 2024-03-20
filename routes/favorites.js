import express from 'express';
import User from '../models/User.js';
import authenticationToken from './auth.js'

const router = express.Router();
router.use(authenticationToken);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
};
router.post('/add', authenticateToken, async (req, res) => {
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


router.post('/remove', authenticateToken,async (req, res) => {
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


router.get('/', authenticateToken, async (req, res) => {
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