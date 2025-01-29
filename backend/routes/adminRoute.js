import express from 'express'
import AdminController from '../controller/adminController.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.post("/product/add", upload.fields([{ name: 'image', maxCount: 1 }]), AdminController.addProduct)
router.post("/product/remove", AdminController.removeProduct)
router.post("/product", AdminController.listAllProducts)

export default router
