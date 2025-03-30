import * as nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config(); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.SENDER_EMAIL}`,
    pass: `${process.env.SENDER_PASS}`, 
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: `"Imad" ${process.env.SENDER_EMAIL}`,
    to,
    subject,
    text,
  });
}


sendEmail('recipient@example.com', 'Test Email', 'Hello, this is a test email!');
