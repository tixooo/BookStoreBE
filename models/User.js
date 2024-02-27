import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    // image: {type: String, required: true},
    // fullName: {type: String, required: true},
})

const User = mongoose.model('User', userSchema, 'BookstoreUser')

export default User