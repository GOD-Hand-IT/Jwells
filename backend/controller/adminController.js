import { v2 as cloudinary } from 'cloudinary'
import productModal from '../model/productModal.js'

export default class AdminController {
    static addProduct = async (req, res) => {
        try {
            const { name, price, description, category } = req.body
            const image = req.files.image && req.files.image[0]
            if (!image) {
                return res.status(400).json({ success: false, message: "Image is required" })
            }
            
            const image1 = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
            const product = new productModal({
                name,
                price,
                description,
                image: image1.secure_url,
                category
            })
            await product.save()
            return res.json({ success: true, message: "Product added successfully" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: "Server error" })
        }
    }

    static removeProduct = async (req, res) => {
        try {
            const { id } = req.body
            const product = await productModal.findById(id)
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" })
            }
            await product.remove()
            res.json({ success: true, message: "Product removed successfully" })
        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: "Server error" })
        }
    }

    static listAllProducts = async (req, res) => { 
        try {
            const products = await productModal.find()
            res.json({ success: true, data: products })
        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: "Server error" })
        }
    }
}