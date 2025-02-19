import Order from '../model/order.js';
import CartProduct from '../model/cartProduct.js';
import { v4 as uuidv4 } from 'uuid';

export default class OrderController {
    static async createOrder(req, res) {
        try {
            const { userId, shippingAddress } = req.body;

            // Get cart items
            const cartItems = await CartProduct.find({ userId }).populate('productId');

            if (!cartItems.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Cart is empty'
                });
            }

            // Calculate totals
            let totalAmount = 0;
            let paidAmount = 0;

            const orderItems = cartItems.map(item => {
                const itemTotal = item.productId.price * item.quantity;
                totalAmount += itemTotal;
                if (item.isPreOrder) {
                    paidAmount += item.partialPayment;
                }

                return {
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.productId.price,
                    isPreOrder: item.isPreOrder
                };
            });

            // Create order
            const order = await Order.create({
                userId,
                items: orderItems,
                totalAmount,
                paidAmount,
                balanceAmount: totalAmount - paidAmount,
                shippingAddress,
                trackingNumber: uuidv4().substring(0, 8).toUpperCase()
            });

            // Clear cart
            await CartProduct.deleteMany({ userId });

            return res.status(201).json({
                success: true,
                message: 'Order created successfully',
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
            const { userId } = req.params;
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
