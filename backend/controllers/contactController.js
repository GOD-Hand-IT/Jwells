import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID, // Your email
        pass: process.env.PASS_KEY // Your password
    },
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    tls: {
        rejectUnauthorized: false
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
                to: process.env.EMAIL_ID, // Your email where you want to receive descriptions
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
}