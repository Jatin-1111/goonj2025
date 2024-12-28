// app/api/send-registration-confirmation/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function POST(req) {
    try {
        const {
            email,
            name,
            registrationId,
            events,
            totalAmount,
            paymentStatus
        } = await req.json();

        // Format events list for email
        const eventsList = events.map(event =>
            `<li>${event.name} - ₹${event.price}</li>`
        ).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our Community! Registration Confirmed',
            html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Segoe UI', Arial, sans-serif;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f6f9fc; padding: 20px;">
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header Section -->
                    <tr>
                      <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px 10px 0 0;">
                        <img src="" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Registration Confirmed!</h1>
                      </td>
                    </tr>
      
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                          Dear <span style="color: #2d3748; font-weight: 600;">${name}</span>,
                        </p>
                        
                        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                          Thank you for registering! We're excited to have you join us. Here are your registration details:
                        </p>
      
                        <!-- Registration Details Card -->
                        <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0; color: #2d3748; font-size: 15px;">
                                  <strong style="color: #4a5568;">Registration ID:</strong>
                                  <span style="float: right; color: #667eea; font-weight: 600;">${registrationId}</span>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0; color: #2d3748; font-size: 15px;">
                                  <strong style="color: #4a5568;">Payment Status:</strong>
                                  <span style="float: right; color: ${paymentStatus === 'pending' ? '#e53e3e' : '#48bb78'}; font-weight: 600;">
                                    ${paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                                  </span>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="margin: 0; color: #2d3748; font-size: 15px;">
                                  <strong style="color: #4a5568;">Total Amount:</strong>
                                  <span style="float: right; color: #2d3748; font-weight: 600;">₹${totalAmount}</span>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>
      
                        <!-- Registered Events Section -->
                        <h3 style="color: #2d3748; font-size: 20px; margin: 0 0 20px; padding-bottom: 10px; border-bottom: 2px solid #edf2f7;">
                          Your Registered Events
                        </h3>
                        <div style="margin-bottom: 30px;">
                          ${eventsList}
                        </div>
      
                        ${paymentStatus === 'pending' ? `
                          <!-- Payment Pending Alert -->
                          <div style="background-color: #fff5f5; border-left: 4px solid #e53e3e; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                            <p style="color: #c53030; margin: 0; font-size: 15px;">
                              <strong>⚠️ Action Required:</strong> Please complete your payment to confirm your registration.
                            </p>
                            <a href="#" style="display: inline-block; background-color: #e53e3e; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 15px; font-weight: 500;">
                              Complete Payment
                            </a>
                          </div>
                        ` : ''}
      
                        <!-- Next Steps Section -->
                        <div style="background-color: #ebf4ff; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                          <h4 style="color: #2c5282; margin: 0 0 15px; font-size: 18px;">Next Steps</h4>
                          <ul style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0; padding-left: 20px;">
                            <li>Follow us on social media for updates</li>
                          </ul>
                        </div>
      
                        <!-- Contact Support -->
                        <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
                          If you have any questions or need assistance, please don't hesitate to contact our support team at
                          <a href="mailto:support@example.com" style="color: #667eea; text-decoration: none; font-weight: 500;">support@example.com</a>
                        </p>
                      </td>
                    </tr>
      
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #1a202c; color: #ffffff; padding: 30px; text-align: center; border-radius: 0 0 10px 10px;">
                        <p style="margin: 0 0 15px; font-size: 14px;">
                          Follow us on social media:
                        </p>
                        <div style="margin-bottom: 20px;">
                          <!-- Add your social media icons/links here -->
                          <a href="#" style="margin: 0 10px; text-decoration: none; color: #ffffff;">Twitter</a>
                          <a href="#" style="margin: 0 10px; text-decoration: none; color: #ffffff;">Facebook</a>
                          <a href="#" style="margin: 0 10px; text-decoration: none; color: #ffffff;">Instagram</a>
                        </div>
                        <p style="margin: 0; color: #a0aec0; font-size: 13px;">
                          © ${new Date().getFullYear()} Your Organization. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
      
                  <!-- Unsubscribe Footer -->
                  <table width="600" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding: 20px 0; text-align: center;">
                        <p style="margin: 0; color: #718096; font-size: 12px;">
                          You received this email because you registered for our event.
                          <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Confirmation email sent successfully'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to send confirmation email'
            },
            { status: 500 }
        );
    }
}