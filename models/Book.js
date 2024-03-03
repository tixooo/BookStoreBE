import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    publisher: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    discountedPrice: {type: Number, required: false},
    topSelling: {type: Boolean, required: false},
    createdAt: {type: Date, default: Date.now}
})

const Book = mongoose.model('Book', bookSchema, 'BookstoreBooks')

export default Book