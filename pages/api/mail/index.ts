import nodemailer from "nodemailer";
import { HTML_TEMPLATE } from "./templates/emailTemplate";

/**
 * create nodemailer transporter
 * @returns - nodemailer transporter
 */
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

/**
 * Function to send email to user
 * @param mailDetails - userEmail, username, url, isEmailConfirmation
 * @returns success response or error
 */
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
  let buttonText = "Confirm Email Address";
  let followUpText =
    "If you did not sign up for Homestead, please ignore this email.";

  if (!isEmailConfirmation) {
    bodyText =
      "We have received a request to reset your Homestead password. Please click the button below to reset it.";
    subject = "Reset Homestead password";
    buttonText = "Reset Password";
    followUpText =
      "If you did not request a password reset, please ignore this email.";
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: userEmail,
      subject,
      html: HTML_TEMPLATE(username, url, bodyText, buttonText, followUpText),
    });
    return info;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

export default sendMail;
