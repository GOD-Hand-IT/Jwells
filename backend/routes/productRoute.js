import express from 'express'
import ProductController from '../controller/productController.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.get("/category", ProductController.getCategories)
router.post("/add", upload.fields([{ name: 'image', maxCount: 1 }]), ProductController.addProduct)
router.post("/remove", ProductController.removeProduct)
router.get("/all", ProductController.listAllProduct)
router.get("/:category", ProductController.getProductsOnCategory)
router.get("/info/:id", ProductController.productInfo)

export default router

