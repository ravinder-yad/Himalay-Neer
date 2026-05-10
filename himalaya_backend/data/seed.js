const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const products = [
    {
        name: '20L Premium Water Jar',
        description: 'Pure and refreshing Himalayan water in a 20L reusable jar.',
        price: 250,
        category: 'Water Bottle',
        stock: 100,
        imageUrl: '/assets/p_20l.png'
    },
    {
        name: '5L Himalayan Spring Water',
        description: 'Convenient 5L bottle for home and office use.',
        price: 90,
        category: 'Water Bottle',
        stock: 200,
        imageUrl: '/assets/p_5l.png'
    },
    {
        name: 'Automatic Water Dispenser',
        description: 'Easy to use rechargeable automatic water pump.',
        price: 450,
        category: 'Dispenser',
        stock: 50,
        imageUrl: '/assets/dispenser.png'
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
