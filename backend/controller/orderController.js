import Order from '../model/order.js';
import CartProduct from '../model/cartProduct.js';
import User from '../model/userModal.js';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASS_KEY
    },
    secure: false,
    port: 25,
    tls: {
        rejectUnauthorized: false
    }
});

export default class OrderController {
    static async createOrder(req, res) {
        try {
            const { userId, shippingAddress, phoneNumber } = req.body;

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
                shippingAddress
            });

            // Send order confirmation email
            await OrderController.#processOrderConfirmation(userId, phoneNumber, cartItems);

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

    static async #processOrderConfirmation(userId, phoneNumber, cartItems) {
        const user = await User.findById(userId);
        if (!user || !cartItems.length) {
            throw new Error('Invalid user or cart items');
        }

        // Create PDF
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });

        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));

        // Add company header
        doc.font('Helvetica-Bold')
            .fontSize(28)
            .fillColor('#333333')
            .text('J WELLS', { align: 'center' })
        // ...rest of PDF generation code...

        let total = 0;
        for (const item of cartItems) {
            const subtotal = item.productId.price * item.quantity;
            total += subtotal;
            // ...rest of items processing...
        }

        doc.end();

        // Convert PDF to buffer
        const pdfBuffer = Buffer.concat(buffers);

        // Send email
        const mailOptions = {
            from: user.email,
            to: process.env.EMAIL_ID,
            subject: 'Order Confirmation',
            html: `
                <h3>New Order Received</h3>
                <p>Customer Email: ${user.email}</p>
                <p>Phone Number: ${phoneNumber}</p>
                <p>Total Amount: Rs. ${total}</p>
                <p>Please check the attached PDF for complete order details.</p>
            `,
            attachments: [{
                filename: 'order-details.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
            }]
        };

        await transporter.sendMail(mailOptions);
    }
}
