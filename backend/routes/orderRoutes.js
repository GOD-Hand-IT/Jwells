import express from 'express';
import OrderController from '../controller/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.post('/create', OrderController.createOrder);
router.get('/user/:userId', OrderController.getUserOrders);
router.get('/:orderId', OrderController.getOrderById);

export default router;
