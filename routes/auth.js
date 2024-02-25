import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password, email, fullName, image} = req.body;
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
            fullName,
            image
        })

        await newUser.save()

        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }

})

export default router