/**
 * @workspace Jwells/backend
 * @controller ProductController
 * @description Handles product-related operations
 */
import productModal from '../model/productModal.js'

export default class ProductController {
    static getCategories = async (req, res) => {
        try {
            const categories = await productModal.distinct("category")
            return res.status(200).json({
                success: true,
                message: "Categories retrieved successfully",
                data: categories
            })
        } catch (err) {
            return res.sendStatus(500)
        }
    }

    static productInfo = async (req, res) => {
        try {
            const id = req.params.id
            const product = await productModal.findById(id)
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Product not found" 
                })
            }
            return res.status(200).json({ 
                success: true, 
                message: "Product retrieved successfully",
                data: product 
            })
        } catch (err) {
            return res.sendStatus(500)
        }
    }

    static getProductsOnCategory = async (req, res) => {
        try {
            const category  = req.params.category
            const products = (await productModal.find({ category })).map(product => ({
                id: product._id,
                name: product.name,
                price: product.price,
                discountPercentage: product.discountPercentage,
                image: product.image[0]
            }))
            return res.json({ success: true, data: products })

        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}