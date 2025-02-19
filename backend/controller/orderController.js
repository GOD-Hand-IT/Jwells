import Razorpay from 'razorpay';
import Order from '../model/order.js';
import CartProduct from '../model/cartProduct.js';
import ContactController from '../controllers/contactController.js';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

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
                paymentMethod
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
            

            // Create order with payment method
            const order = await Order.create({
                userId,
                items: orderItems,
                totalAmount,
                paidAmount,
                balanceAmount: balanceDue,
                shippingAddress,
                contactPhone,
                paymentMethod,
                paymentStatus: paymentMethod === 'cod' ? 'pending' : 'partial'
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

    static async handleRazorpayPayment(req, res) {
        try{
            const { payAmount } = req.body;
            const options = {
                amount: payAmount * 100, // Amount in paise
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                payment_capture: 1,
            };
        
            const razorpayOrder = await razorpayInstance.orders.create(options, (err, order) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error creating Razorpay order',
                        error: err.message
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: order
                });
            });
        }
        catch (error) {
          console.error('Razorpay payment error:', error);
          return res.status(500).json({
            success: false,
            message: 'Error processing Razorpay payment',
            error: error.message
          });
        }
      }

      static async verifyPayment(req, res) {
        const { payAmount } = req.body;
    
        try {

            // Create Razorpay order
          const options = {
            amount: payAmount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
          };
    
          const razorpayOrder = await razorpayInstance.orders.create(options);

          const razorpayOrderId = razorpayOrder.id;



          const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');
    
          if (generatedSignature === razorpaySignature) {
            // Update order status to 'paid'
            await Order.updateOne(
              { razorpayOrderId },
              { paymentStatus: 'paid', razorpayPaymentId }
            );
    
            return res.status(200).json({ success: true, message: 'Payment verified successfully' });
          } else {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          return res.status(500).json({ message: 'Failed to verify payment' });
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
