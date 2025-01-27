import productModal from '../model/productModal.js'

export default class ProductController {
    static getCategories = async (req, res) => {
        try {
            const categories = await productModal.distinct("category")

            res.json({
                message: "category product",
                data: categories,
                success: true,
                error: false
            })

        } catch (err) {
            res.status(400).json({
                message: err.message || err,
                error: true,
                success: false
            })
        }
    }

    static productInfo = async (req, res) => {
        try {
            const id  = req.params.id
            const product = await productModal.findById(id)
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" })
            }
            res.json({ success: true, data: product })

        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: "Server error" })
        }
    }

    static getProductsOnCategory = async (req, res) => {
        try {
            const category  = req.params.category
            const products = (await productModal.find({ category })).map(product => ({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image[0]
            }))
            return res.json({ success: true, data: products })

        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: "Server error" })
        }
    }
}