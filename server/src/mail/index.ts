import nodemailer from "nodemailer";
import { HTML_TEMPLATE } from "./templates/confirmEmail.js";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (mailDetails: {
  userEmail: string;
  username: string;
  url: string;
  isEmailConfirmation?: boolean;
}) => {
  const { userEmail, username, url, isEmailConfirmation } = mailDetails;

  let bodyText =
    "Thank you for signing up with Homestead!&#128525; To complete your registration, please click the button below to confirm your email address:";
  let subject = "Confirm Homestead email";
  if (!isEmailConfirmation) {
    bodyText =
      "You have requested to reset your password. Please click the button below to reset your password:";
    subject = "Reset Homestead password";
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: userEmail,
      subject,
      html: HTML_TEMPLATE(username, url, bodyText),
    });
    return info;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

export default sendMail;
