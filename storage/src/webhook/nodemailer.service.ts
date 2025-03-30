import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naitmihoubimzd@gmail.com',
    pass: 'imad552006', 
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: '"Imad" naitmihoubimzd@gmail.com',
    to,
    subject,
    text,
  });
}


sendEmail('recipient@example.com', 'Test Email', 'Hello, this is a test email!');
