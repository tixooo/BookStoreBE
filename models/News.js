import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    publisher: {type: String, required: true},
    image: {type: String, required: true},
    publishedAt: {type: Date, default: Date.now},
})

const News = mongoose.model('News',newsSchema, 'BookstoreNews')

export default News