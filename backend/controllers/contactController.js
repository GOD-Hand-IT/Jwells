import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import PDFDocument from 'pdfkit';
import User from '../model/userModal.js';
import Cart from '../model/cartProduct.js';
import axios from 'axios'; // Add this import for fetching images

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "selvathala8677@gmail.com", // Your email
        pass: "ldiq kmjo ucei kpzb"
    }
});

export default class ContactController {
    // Contact form handler
    static sendContactForm = asyncHandler(async (req, res) => {
        const { firstName, lastName, email, description, phone } = req.body;
        const files = req.files;

        if (!firstName || !email || !description) {
            res.status(400);
            throw new Error('Please fill all required fields');
        }

        try {
            // Prepare attachments if files exist
            let attachments = [];
            if (files && files.length > 0) {
                attachments = files.map(file => ({
                    filename: file.originalname,
                    content: file.buffer,
                    contentType: file.mimetype
                }));
            }

            const mailOptions = {
                from: email,
                to: "selvathala8677@gmail.com", // Your email where you want to receive descriptions
                subject: `Contact Form Message from ${firstName}`,
                html: `
                    <h3>Contact Form Message</h3>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Message:</strong></p>
                    <p>${description}</p>
                    ${files && files.length > 0 ? `<p><strong>Attachments:</strong> ${files.length} file(s)</p>` : ''}
                `,
                attachments: attachments
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({
                success: true,
                message: 'Contact form submitted successfully with attachments'
            });

        } catch (error) {
            console.error('Email sending error:', error);
            res.status(500).json({
                success: false,
                message: 'Error sending email',
                error: error.message
            });
        }
    });

    static checkout = asyncHandler(async (req, res) => {
        const { userId, phoneNumber } = req.body;

        try {
            const user = await User.findById(userId);
            const cartItems = await Cart.find({ userId })
                .populate('productId');

            if (!user || !cartItems.length) {
                return res.status(400).json({
                    success: false,
                    message: 'No cart items found'
                });
            }

            // Create PDF
            const doc = new PDFDocument({
                size: 'A4',
                margin: 50
            });

            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));

            // Add header
            doc.font('Helvetica-Bold')
               .fontSize(24)
               .text('Order Details', { align: 'center' })
               .moveDown();

            // Add customer details
            doc.fontSize(12)
               .text(`Customer Email: ${user.email}`)
               .text(`Phone Number: ${phoneNumber}`)
               .moveDown();

            let total = 0;
            let yPosition = doc.y;

            // Process each product
            for (const item of cartItems) {
                const subtotal = item.productId.price * item.quantity;
                total += subtotal;

                // Check if we need a new page
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }

                // Add product title
                doc.font('Helvetica-Bold')
                   .fontSize(14)
                   .text(item.productId.name)
                   .font('Helvetica')
                   .fontSize(12);

                // Add image if available
                if (item.productId.image && item.productId.image.length > 0) {
                    try {
                        const response = await axios.get(item.productId.image[0], {
                            responseType: 'arraybuffer'
                        });
                        const imageBuffer = Buffer.from(response.data);
                        
                        doc.image(imageBuffer, {
                            fit: [200, 200],
                            align: 'center'
                        });
                    } catch (error) {
                        console.error('Error adding image:', error);
                        doc.text('Image not available');
                    }
                }

                // Add product details
                doc.moveDown()
                   .text(`Price: ₹${item.productId.price}`)
                   .text(`Quantity: ${item.quantity}`)
                   .text(`Subtotal: ₹${subtotal}`)
                   .moveDown()
                   .lineTo(doc.page.width - 50, doc.y)
                   .stroke()
                   .moveDown();

                yPosition = doc.y;
            }

            // Add total
            doc.font('Helvetica-Bold')
               .fontSize(16)
               .text(`Total Amount: ₹${total}`, { align: 'right' });

            doc.end();

            // Convert PDF to buffer
            const pdfBuffer = Buffer.concat(buffers);

            // Send email with PDF
            const mailOptions = {
                from: user.email,
                to: "selvathala8677@gmail.com",
                subject: 'Order Confirmation',
                html: `
                    <h3>New Order Received</h3>
                    <p>Customer Email: ${user.email}</p>
                    <p>Phone Number: ${phoneNumber}</p>
                    <p>Total Amount: ₹${total}</p>
                    <p>Please check the attached PDF for complete order details.</p>
                `,
                attachments: [{
                    filename: 'order-details.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }]
            };

            await transporter.sendMail(mailOptions);

            // Clear cart
            await Cart.deleteMany({ userId });

            res.status(200).json({
                success: true,
                message: 'Order placed successfully'
            });

        } catch (error) {
            console.error('Checkout error:', error);
            res.status(500).json({
                success: false,
                message: 'Error processing order',
                error: error.message
            });
        }
    });
}