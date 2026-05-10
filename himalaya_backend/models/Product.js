const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price']
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['Water Bottle', 'Dispenser', 'Service', 'Other']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide product stock'],
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
