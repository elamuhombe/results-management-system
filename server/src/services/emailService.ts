//src/services/emailService.ts
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //email provider SMTP server
  port: 587, // Common SMTP port
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.EMAIL_USER, // sender email address
    pass: process.env.EMAIL_PASS, // sender email password or app password
  },
});

// Function to send the password reset email
export const sendResetEmail = async (email: string, resetToken: string) => {
  const resetUrl = `https://your-frontend-url.com/reset-password?token=${resetToken}`; // URL for resetting the password

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // List of recipients
    subject: 'Password Reset Request', // Subject line
    text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`, // Plain text body
    html: `<p>You requested a password reset. Please click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`, // HTML body
  };

  await transporter.sendMail(mailOptions); // Send the email
};
