/**
 * @workspace Jwells/backend
 * @controller AdminController
 * @description Handles admin-specific operations
 */
import { v2 as cloudinary } from 'cloudinary'
import productModal from '../model/productModal.js'

export default class AdminController {
    static addProduct = async (req, res) => {
        try {
            const { name, price, description, category } = req.body
            const image = req.files.image && req.files.image[0]
            
            if (!image) {
                return res.sendStatus(400)
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
            return res.status(201).json({ 
                success: true, 
                message: "Product added successfully",
                data: product
            })
        } catch (err) {
            console.error(err)
            return res.sendStatus(500)
        }
    }

    static removeProduct = async (req, res) => {
        try {
            const { id } = req.body
            const product = await productModal.findById(id)
            if (!product) {
                return res.sendStatus(404)
            }
            await product.remove()
            return res.status(200).json({ 
                success: true, 
                message: "Product removed successfully" 
            })
        } catch (err) {
            console.error(err)
            return res.sendStatus(500)
        }
    }

    static listAllProducts = async (req, res) => { 
        try {
            const products = await productModal.find()
            res.json({ success: true, data: products })
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}