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
            const changeQuantity = parseInt(quantity);
            if (isNaN(changeQuantity)) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide a valid quantity'
                });
            }

            // Check if product exists in cart
            const existingCartItem = await addToCartModel.findOne({
                productId,
                userId
            });

            if (existingCartItem) {
                // Calculate new quantity
                const newQuantity = existingCartItem.quantity + changeQuantity;

                // If new quantity is 0 or negative, remove the item
                if (newQuantity <= 0) {
                    await addToCartModel.findByIdAndDelete(existingCartItem._id);
                    return res.status(200).json({
                        success: true,
                        message: 'Item removed from cart',
                    });
                }

                // Update quantity of existing item
                existingCartItem.quantity = newQuantity;
                await existingCartItem.save();
                return res.status(200).json({
                    success: true,
                    data: existingCartItem
                });
            } else {
                // Only create new cart item if quantity is positive
                if (changeQuantity <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid quantity for new item'
                    });
                }

                // Create new cart item
                const cartItem = await addToCartModel.create({
                    productId,
                    quantity: changeQuantity,
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
            console.log('Received userId:', userId); // Debug log

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'UserId is required'
                });
            }

            const cartItems = await addToCartModel.find({ userId })
                .populate('productId')
                .lean();  // Convert to plain JavaScript objects

            console.log('Found cart items:', cartItems); // Debug log

            return res.status(200).json({
                success: true,
                message: 'Cart retrieved successfully',
                data: cartItems || []
            });
        } catch (error) {
            console.error('Cart fetch error:', error); // Debug log
            return res.status(500).json({
                success: false,
                message: 'Error fetching cart items',
                error: error.message
            });
        }
    }
}
