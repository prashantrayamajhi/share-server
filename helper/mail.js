const nodemailer = require("nodemailer");

/**
 * Creates transporter object that will help us to send emails
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 *  Sends an email to user
 *
 * @param {string} to email address where to send mail
 * @param {string} subject of the email
 * @param {string} html content of the email
 */
exports.sendEmail = async ({ to, subject, html }) => {
  try {
    const options = { from: process.env.MAIL_USER, to, subject, html };
    const mail = await transporter.sendMail(options);
    return mail;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 *  Sends validation token to user
 *
 * @param {string} to email address where to send mail
 * @param {string} subject of the email
 * @param {string} html content of the email
 */

exports.sendVerificationToken = async ({ to, subject, html }) => {
  try {
    const options = { from: process.env.MAIL_USER, to, subject, html };
    const mail = await transporter.sendMail(options);
    return mail;
  } catch (err) {
    console.log(err);
    return err;
  }
};
