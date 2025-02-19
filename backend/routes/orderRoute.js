import express from 'express';
import placeOrder from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/placeOrder', placeOrder);

export default orderRouter;