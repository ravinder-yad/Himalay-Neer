const express = require('express');
const router = express.Router();
const { 
    createOrder, 
    getOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder,
    getCustomers,
    getOrdersByPhone
} = require('../controllers/orderController');

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/customers')
    .get(getCustomers);

router.route('/customer/:phone')
    .get(getOrdersByPhone);

router.route('/:id')
    .get(getOrderById)
    .put(updateOrderStatus)
    .delete(deleteOrder);

module.exports = router;
