import Order from '../model/order.js';
import CartProduct from '../model/cartProduct.js';
import ContactController from '../controllers/contactController.js';

export default class OrderController {
    static async createOrder(req, res) {
        try {
            const {
                userId,
                shippingAddress,
                contactPhone,
                totalAmount,
                balanceDue,
                paidAmount,
                paymentMethod,
                transactionId
            } = req.body;

            if (!userId || !shippingAddress || !contactPhone || !paymentMethod) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            // Get cart items
            const cartItems = await CartProduct.find({ userId }).populate('productId');

            if (!cartItems.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Cart is empty'
                });
            }

            const orderItems = cartItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price,
                isPreOrder: paymentMethod === 'cod' ? false : item.isPreOrder,
                partialPayment: paymentMethod === 'cod' ? 0 : (item.isPreOrder ? item.partialPayment : 0)
            }));

            // Create order using amounts from request body
            const order = await Order.create({
                userId,
                items: orderItems,
                totalAmount,
                paidAmount,
                balanceAmount: balanceDue,
                shippingAddress,
                contactPhone,
                paymentMethod,
                paymentStatus: paymentMethod === 'cod' ? 'pending' : (paidAmount > 0 ? 'partial' : 'pending'),
                transactionId: transactionId || null
            });

            // Call checkout from ContactController
            await ContactController.checkout({
                body: {
                    userId,
                    phoneNumber: contactPhone,
                    shippingAddress,
                    totalAmount,
                    balanceDue
                }
            }, {
                status: () => ({
                    json: (data) => {
                        if (!data.success) {
                            throw new Error(data.message);
                        }
                    }
                })
            });

            // Clear cart only after successful checkout
            await CartProduct.deleteMany({ userId });

            return res.status(201).json({
                success: true,
                message: 'Order created successfully',
                orderId: order._id,
                data: order
            });
        } catch (error) {
            console.error('Order creation error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error creating order',
                error: error.message
            });
        }
    }

    static async getUserOrders(req, res) {
        try {
            const { userId } = req.body;
            const orders = await Order.find({ userId })
                .populate('items.productId')
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                data: orders
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching orders',
                error: error.message
            });
        }
    }

    static async getOrderById(req, res) {
        try {
            const { orderId } = req.params;
            const order = await Order.findById(orderId).populate('items.productId');

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: order
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching order',
                error: error.message
            });
        }
    }
}
