const nodemailer = require("nodemailer");

async function sendEmail(subject, email, content) {
  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "test21290@outlook.fr",
      pass: "Test12345678.9",
    },
  });

  const mailOptions = {
    from: "test21290@outlook.fr",
    to: email,
    subject: subject,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendEmail,
};
