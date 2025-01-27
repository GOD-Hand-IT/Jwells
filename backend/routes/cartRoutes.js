import express from 'express';
import CartController from '../controller/cartController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Apply verifyToken middleware to all cart routes
router.use(verifyToken);

router.post('/add', CartController.addToCart);
router.delete('/remove', CartController.removeFromCart);
router.get('/show', CartController.showCart);

export default router;
