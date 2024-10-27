"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetEmail = void 0;
//src/services/emailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter for sending emails
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com', //email provider SMTP server
    port: 587, // Common SMTP port
    secure: false, // Set to true if using port 465
    auth: {
        user: process.env.EMAIL_USER, // sender email address
        pass: process.env.EMAIL_PASS, // sender email password or app password
    },
});
// Function to send the password reset email
const sendResetEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    const resetUrl = `https://your-frontend-url.com/reset-password?token=${resetToken}`; // URL for resetting the password
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // List of recipients
        subject: 'Password Reset Request', // Subject line
        text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`, // Plain text body
        html: `<p>You requested a password reset. Please click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`, // HTML body
    };
    yield transporter.sendMail(mailOptions); // Send the email
});
exports.sendResetEmail = sendResetEmail;
