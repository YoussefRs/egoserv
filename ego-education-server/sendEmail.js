import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yesdeuce@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });
    return await transporter.sendMail(options);
  } catch (error) {
    return error;
  }
};
