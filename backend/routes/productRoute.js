import express from 'express'
import ProductController from '../controller/productController.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.get("/all", ProductController.listAllProduct)
router.post("/add", upload.fields([{ name: 'image', maxCount: 1 }]), ProductController.addProduct)
router.post("remove", ProductController.removeProduct)
router.get("/:id", ProductController.productInfo)

export default router

