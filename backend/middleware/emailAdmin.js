const ejs = require("ejs");
const path = require("path");
const { tryCatch } = require("../Utils/tryCatchController");
const sendEmail = require("../Utils/sendmail");

exports.sendEmailtoUser = tryCatch(async (req, res, next) => {
  try {
    const { users, subject, title, paragraph, links, linkaddress } =
      await req.body;
    const linkArray = links.split(",");
    const linkaddressArray = linkaddress.split(",");

    const template = path.join(__dirname, "../views/globalemail.ejs");
    const data = await ejs.renderFile(template, {
      title: title,
      links: linkArray,
      linkaddress: linkaddressArray,
      paragraph: paragraph,
      //company logo link from mydvs site
      src: `https://static.wixstatic.com/media/0fe16d_5d7c5c03e40342d68305c01cf1bdee4f~mv2.jpg/v1/fill/w_91,h_91,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1657388815725.jpg`,
    });
    sendEmail({
      to: users,
      subject: subject,
      html: data,
    });
    res.status(200).json({
      success: true,
      message: "Email has been sent to client",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Sending mail!");
  }
});
