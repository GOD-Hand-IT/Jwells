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
            const { id } = req.body;
            console.log('Delete request body:', req.body); // Add debug log
            
            if (!id) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Product ID is required" 
                });
            }

            const product = await productModal.findById(id);
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Product not found" 
                });
            }
            
            await product.deleteOne(); // Using deleteOne() instead of remove()
            return res.status(200).json({
                success: true,
                message: "Product removed successfully"
            });
        } catch (err) {
            console.error('Error in removeProduct:', err);
            return res.status(500).json({
                success: false,
                message: "Error removing product"
            });
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

    static updateProduct = async (req, res) => {
        try {
            const { id, name, price, description, category } = req.body

            // Check if product exists
            const existingProduct = await productModal.findById(id)
            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })
            }

            // Prepare update object
            const updateData = {
                name: name || existingProduct.name,
                price: price || existingProduct.price,
                description: description || existingProduct.description,
                category: category || existingProduct.category
            }

            // Handle image update if provided
            if (req.files && req.files.image) {
                const image = req.files.image[0]

                // Delete old image if it exists
                if (existingProduct.image) {
                    const publicId = existingProduct.image.split('/').pop().split('.')[0];
                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (deleteErr) {
                        console.error('Error deleting old image:', deleteErr);
                    }
                }

                // Upload new image
                const image1 = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
                updateData.image = image1.secure_url
            }

            // Update product
            const updatedProduct = await productModal.findByIdAndUpdate(
                id,
                updateData,
                { new: false }
            )

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                success: false,
                message: "Error updating product"
            })
        }
    }
}