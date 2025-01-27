/**
 * @workspace Jwells/backend
 * @controller CartController
 * @description Manages shopping cart operations
 */
import addToCartModel from '../model/cartProduct.js';

export default class CartController {
    static async addToCart(req, res) {
        try {
            const { productId, quantity, userId } = req.body;
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'UserId is required'
                });
            }

            // Validate quantity is a valid number
            const parsedQuantity = parseInt(quantity);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Please provide a valid quantity' 
                });
            }

            // Check if product already exists in cart
            const existingCartItem = await addToCartModel.findOne({ 
                productId, 
                userId 
            });

            if (existingCartItem) {
                // Update quantity of existing item
                existingCartItem.quantity = existingCartItem.quantity + parsedQuantity;
                await existingCartItem.save();
                return res.status(200).json({ 
                    success: true, 
                    message: 'Cart updated successfully',
                    data: existingCartItem 
                });
            } else {
                // Create new cart item
                const cartItem = await addToCartModel.create({
                    productId,
                    quantity: parsedQuantity,
                    userId
                });
                return res.status(201).json({ 
                    success: true, 
                    message: 'Item added to cart',
                    data: cartItem 
                });
            }
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    static async removeFromCart(req, res) {
        try {
            const { cartItemId, userId } = req.body;
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'UserId is required'
                });
            }

            await addToCartModel.findByIdAndDelete(cartItemId);
            return res.status(200).json({ 
                success: true, 
                message: 'Item removed from cart' 
            });
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    static async showCart(req, res) {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'UserId is required'
                });
            }

            const cartItems = await addToCartModel.find({ userId })
                .populate('productId');
            return res.status(200).json({ 
                success: true, 
                message: 'Cart retrieved successfully',
                data: cartItems 
            });
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}
