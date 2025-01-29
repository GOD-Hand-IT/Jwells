import express from 'express';
import AdminController from '../controller/adminController.js';
import checkAdminRole from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/add-product', checkAdminRole, AdminController.addProduct);
router.post('/remove-product', checkAdminRole, AdminController.removeProduct);
router.post('/list-products', checkAdminRole, AdminController.listAllProducts);

export default router;
