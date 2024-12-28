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
      subject: 'Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Thank You for Registering!</h1>
          
          <p>Dear ${name},</p>
          
          <p>Your registration has been successfully completed.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Registration ID:</strong> ${registrationId}</p>
            <p style="margin: 10px 0;"><strong>Payment Status:</strong> ${paymentStatus}</p>
            <p style="margin: 0;"><strong>Total Amount:</strong> ₹${totalAmount}</p>
          </div>

          <h3 style="color: #444;">Registered Events:</h3>
          <ul style="color: #555;">
            ${eventsList}
          </ul>

          ${paymentStatus === 'pending' ? `
            <p style="color: #d63031; background-color: #ffe3e3; padding: 10px; border-radius: 5px;">
              <strong>Note:</strong> Please complete your payment to confirm your registration.
            </p>
          ` : ''}
          
          <p style="margin-top: 20px;">
            If you have any questions, please don't hesitate to contact us.
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            The Team
          </p>
        </div>
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