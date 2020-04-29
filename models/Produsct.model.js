const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('data',ProductSchema)

module.exports = Product