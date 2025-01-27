import addToCartModel from '../model/cartProduct.js';

export default class CartController {
    static async addToCart(req, res) {
        try {
            const { productId, quantity, userId } = req.body;
            console.log(quantity)
            // Validate quantity is a valid number
            const parsedQuantity = parseInt(quantity);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Please provide a valid quantity' 
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
                res.status(200).json({ success: true, data: existingCartItem });
            } else {
                // Create new cart item
                const cartItem = await addToCartModel.create({
                    productId,
                    quantity: parsedQuantity,
                    userId
                });
                res.status(201).json({ success: true, data: cartItem });
            }
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async removeFromCart(req, res) {
        try {
            const { cartItemId } = req.body;
            await addToCartModel.findByIdAndDelete(cartItemId);
            res.status(200).json({ success: true, message: 'Item removed from cart' });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    static async showCart(req, res) {
        try {
            const { userId } = req.body;
            const cartItems = await addToCartModel.find({ userId })
                .populate('productId')
                .populate('userId', 'name email');
            res.status(200).json({ success: true, data: cartItems });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}
