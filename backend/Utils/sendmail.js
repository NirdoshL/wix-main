const nodemailer = require("nodemailer");

const sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASSWORD,
      //this password is APP_PASSWORD (goto:google->security->search app password and add or delete if needed)
    },
    port: parseInt(process.env.NODE_MAILER_PORT),
    host: process.env.NODE_MAILER_HOST,
  });

  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

//to send mail use sendEmail function and provide necessary fields
//from : admin email
//to : client email
