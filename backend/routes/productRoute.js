import express from 'express'
import ProductController from '../controller/productController.js'

const router = express.Router()

router.get("/category", ProductController.getCategories)
router.get("/:category", ProductController.getProductsOnCategory)
router.get("/info/:id", ProductController.productInfo)

export default router

