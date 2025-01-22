import { v2 as cloudinary } from 'cloudinary'
import productModal from '../model/productModal.js'

export default class ProductController {

    static addProduct = async (req, res) => {
        try {
            const { name, price, description } = req.body

            const image = req.files.image && req.files.image[0]
            if (!image) {
                return res.status(400).json({ success: false, message: "Image is required" })
            }
            else {
                const image1 = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })

                const product = new productModal({
                    name,
                    price,
                    description,
                    image: image1.secure_url
                })
                console.log(image1.secure_url)
                await product.save()
                res.json({ success: true, message: "Product added successfully" })
            }

        } catch (err) {
            console.error(err)
            res.status(500).json({ success: false, message: "Server error" })
        }
    }
    static removeProduct = async (req, res) => { }
    static listAllProduct = async (req, res) => { }
    static productInfo = async (req, res) => { }

}