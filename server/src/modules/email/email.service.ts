import nodemailer from 'nodemailer';
import config from '@config/config';
import { logger } from '@core/utils';
import { Message } from './email.interfaces';

const app = config.appName;

const transport = nodemailer.createTransport({
  service: config.email.smtp.host,
  auth: {
    user: config.email.smtp.auth.user,
    pass: config.email.smtp.auth.pass,
  },
});

/* ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((err: any) =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env' + err.message),
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @returns {Promise<void>}
 */
export const sendEmail = async (to: string, subject: string, html: string): Promise<any> => {
  try {
    const msg: Message = {
      from: config.email.from,
      to,
      subject,
      html: addGlobalStyles(html),
    };
    return await transport.sendMail(msg);
  } catch (err) {
    logger.error(err.message);
  }
};

/**
 * global email styles
 * @param {string} html
 * @returns {string}
 */
export const addGlobalStyles = (html: string): string =>
  `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; font-size:14px; padding: 16px;">
    ${html}
  </div>`;

/**
 * Send verification email
 * @param {string} to
 * @param {string} name
 * @returns {Promise<void>}
 */
export const sendForgotPasswordEmail = async (to: string, name: string, code: number): Promise<void> => {
  const subject = 'OTP Verification';
  const html = `
      <h2>Hi ${name},</h2>
      Thank you for using ${app}. To complete the verification of your account, please enter the following code:
      <strong>OTP Code: ${code}</strong>
      <p>You can enter this code in the ${app} app to verify your account. If you have any problems or questions, please don't hesitate to reach out.</p>
      Best regards,<br>
      The ${app} Team
  `;
  await sendEmail(to, subject, html);
};

/**
 * Send welcome email to user
 * @param {string} to
 * @param {string} name
 * @returns {Promise<void>}
 */
export const sendWelcomeEmail = async (to: string, name: string): Promise<void> => {
  const subject = `Welcome to ${app}`;
  const html = `
        <h1>Welcome to ${app}!</h1>
        <h2>Hi ${name}</h2>
        <p>Congratulations on taking the first step toward your dream wedding. We're thrilled to have you with us.</p>
        <p>Here's a quick guide to get started:</p>
        <ol>
            <li>Explore our curated vendors for rental cars, venues, photographers, and more.</li>
            <li>Create your wishlist to keep track of your favorite services.</li>
            <li>Connect directly with vendors and start planning your perfect day.</li>
        </ol>
        <p>If you have any questions, our team is here to help. Happy planning!</p>
        <p>Best regards,<br>
        The ${app} Team</p>
  `;
  return sendEmail(to, subject, html);
};

/**
 * Send vendor account review email
 * @param {string} to
 * @param {string} name
 * @returns {Promise<void>}
 */
export const vendorAccountReviewEmail = async (to: string, name: string): Promise<void> => {
  const subject = `Account Approval Notification`;
  const html = `
        <h1>Welcome to ${app}!</h1>
        <h2>Hi ${name}</h2>
        <p>Thank you for creating an account. We're excited to have you on board as a vendor.</p>
        <p>Your account is currently pending approval. Once approved by our admin, you will receive an account verification email shortly.</p>
        <p>This verification step ensures the security and authenticity of your account. We appreciate your patience.</p>
        <p>If you have any urgent inquiries or concerns, feel free to contact our support team at support@${app}.com.</p>
        <p>Thank you for choosing ${app}. We look forward to having you as part of our community!</p>
        <p>Best regards,<br>
        The ${app} Team</p>
  `;
  return sendEmail(to, subject, html);
};

/**
 * account approved email
 * @param {string} to
 * @param {string} name
 * @returns {Promise<void>}
 */
export const vendorAccountApprovedEmail = async (to: string, name: string): Promise<void> => {
  const subject = `Your ${app} Account is Approved!`;
  const html = `
        <h2>Congratulations! Your ${app} Account is Approved!</h2>
        <p>Dear ${name},</p>
        <p>We are pleased to inform you that your vendor account on ${app} has been successfully approved by our admin.</p>
        <p>You can now log in and start showcasing your services to couples planning their dream weddings. We are excited to have you as part of our community!</p>
        <p>If you have any questions or need assistance, feel free to reach out to our support team at support@${app}.com.</p>
        <p>Thank you for choosing ${app}. We wish you great success in connecting with couples and providing exceptional wedding services!</p>
        <p>Best regards,<br>
        The ${app} Team</p>
  `;
  return sendEmail(to, subject, html);
};

export const sendNewAdminEmail = async (to: string, name: string, role: string, password: string): Promise<void> => {
  const subject = `Welcome to ${app} - Your Admin Access Details`;
  const html = `
  <p>Hi ${name}</p>
  I hope this email finds you well.<br />
  Congratulations! You have been granted administrative access to ${app}. We're excited to have you on board and look forward to working with you. Here are your login credentials and role:
  <br /><br />
  Email: <b>${to}</b><br />
  Temporary Password: <b>${password}</b><br />
  Assigned Role: <b>${role}</b><br />
  <p><a href='${''}'>${''}</a></p>
  <p>For security reasons, <b>we strongly recommend you change your password immediately after your first login.</b> This helps ensure that your access remains secure and uncompromised.
  If you have any questions or run into any issues, please don't hesitate to contact our support team at support@wedding-wire.com.</p>
  <p>Once again, welcome to the ${app} family! Together, we'll strive to make every journey memorable.
  Warm regards,</p>

  <p>${name}<br />
  Founder, ${app}</p>
  `;
  await sendEmail(to, subject, html);
};

export const contactUsThankYouEmail = async (email: string, username: string) => {
  const subject = `Thank you for contacting ${app}`;
  const html = `
  <p>Hello ${username}. Hope you are doing well.</p>
  <p>
  Thank you for reaching out to Evetify. Our dedicated team will promptly get in touch with you shortly to address your inquiry. We appreciate your interest and look forward to assisting you further.
  </p>
  `;
  await sendEmail(email, subject, html);
};

export const contactUsEmail = async (userEmail: string, username: string, subject: string, message: string): Promise<any> => {
  subject = `Contact US :: ${subject}`;
  const html = `
  <p>Hello ${app}, ${username} here.</p>
  <p>${message}</p>
  <p>contact email :: ${userEmail}</p>
  `;
  await sendEmail('usamakla1122@gmail.com', subject, html);
  contactUsThankYouEmail(userEmail, username);
};

export const jobRequestByVendorEmail = async (
  vendorEmail: string,
  vendorPhone: string,
  userEmail: string,
  message: string,
  jobDescription: string,
) => {
  const subject = `Job Proposal Recieved from ${vendorEmail}`;
  const html = `
  
  <p>Job: ${jobDescription}</p>

  <p>${message}</p>
  <p>Vendor Phone # ${vendorPhone}</p>
  `;
  await sendEmail(userEmail, subject, html);
};

export const requestPricingThankyouEmail = async (email, name, serviceDesc) => {
  const subject = `${name} Thank You for Contacting`;
  const html = `
  Vendor will contact you soon for pricing request against ${serviceDesc}.
  `;
  await sendEmail(email, subject, html);
};

export const requestPricingEmail = async (
  buyerEmail,
  vendorEmail,
  buyerPhone,
  buyerName,
  vendorName,
  serviceDesc,
  buyerMessage,
) => {
  const subject = `Pricing Request from  ${buyerName}`;
  const html = `
  <p>Hello ${vendorName}!</p>
  <p>I need pricing for ${serviceDesc}</p>
  <p>${buyerMessage}</p>

  <b>Buyer Contact:</b>
  <p>email: ${buyerEmail}</p>
  <p>phone: ${buyerPhone}</p>
  `;
  await sendEmail(vendorEmail, subject, html);
  await requestPricingThankyouEmail(buyerEmail, buyerName, serviceDesc);
};
