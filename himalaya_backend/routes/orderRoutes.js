import express from 'express';
import { 
    createOrder, 
    getOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder,
    getCustomers,
    getOrdersByPhone,
    getMyOrders
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, authorize('admin'), getOrders)
    .post(createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/customers')
    .get(protect, authorize('admin'), getCustomers);

router.route('/customer/:phone')
    .get(protect, authorize('admin'), getOrdersByPhone);

router.route('/:id')
    .get(getOrderById)
    .put(protect, authorize('admin'), updateOrderStatus)
    .delete(protect, authorize('admin'), deleteOrder);

export default router;
