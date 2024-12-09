import * as nodemailer from "nodemailer";
require("dotenv").config();

export const sendEmail = async (
  emailBody: string,
  subjectHeading: string,
  pdfBytes: any, // TODO Fix type
  toEmailAdress: string
) => {
  if (!pdfBytes) throw new Error("Email payload pdf can not be empty");

  if (!toEmailAdress) throw new Error("Email adress must be present");
    
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter
    .sendMail({
      to: toEmailAdress,
      subject: subjectHeading,
      html: emailBody,
      attachments: [
        {
          filename: "receipt.pdf",
          content: pdfBytes,
          contentType: "application/pdf",
        },
      ],
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((e) => {
      console.error(`Error sending email: ${e}`);
    });
};
