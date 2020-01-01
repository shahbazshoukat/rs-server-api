var nodemailer = require("nodemailer");

exports.sendEmail = (email, token) => {
    const link = "http://localhost:4200/resetpassword/" + token;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shahbaz.shoukat.330@gmail.com",
      pass: "drowssaP@009"
    }
  });
  var mailOptions = {
    from: "shahbaz.shoukat.330@gmail.com",
    to: email,
    subject: "Todoos | Reset Password",
    html:
      "<h1>ToDoos | Reset Password</h1><p>Please Click </p><a href=" + link + ">Here</a><p> to reset your password.</p>"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
