import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const secretKey = crypto.randomBytes(32).toString('hex');
const router = express.Router()

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

router.post('/register', authenticateToken, async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({message: 'Email already exists'});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            // fullName,
            // image
        })
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        await newUser.save()
        const userData = {
            email: email,
            username: username
        }
        res.status(201).json({message: 'User created successfully', token, user:  userData})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }

})

router.post('/login', authenticateToken, async (req, res) => {

    const {email, password} = req.body;
    try {
        const existingEmail = await User.findOne({email});
        if(!existingEmail) {
            return res.status(400).json({message: 'Email does not exists'});
        }

        const isMatch = await bcrypt.compare(password, existingEmail.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const userData = {
            email: email,
        }
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({message: 'Login successful', token, user:  userData})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

export default router