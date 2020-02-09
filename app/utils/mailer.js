const nodemailer = require('nodemailer');

const {
  config
} = require('../../helpers');

exports.sendCommentEmail = (to, link) => {

  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass
    }
  });

  const mailOptions = {
    from: config.email.defaultEmail,
    to: to.email,
    subject: 'ResultSquare | New Comment',
    html:
        `<h1>ResultSquare | New Comment</h1><p>New Comment added, click </p><a href=${link}>Here</a><p> to view.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {

      console.log(error);

    } else {

      console.log(`Email sent: ${info.response}`);

    }

  });

};

exports.sendEmail = (email, token) => {

  const link = `http://localhost:4200/resetpassword/${token}`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shahbaz.shoukat.330@gmail.com',
      pass: 'drowssaP@009'
    }
  });
  const mailOptions = {
    from: 'shahbaz.shoukat.330@gmail.com',
    to: email,
    subject: 'Todoos | Reset Password',
    html:
      `<h1>ToDoos | Reset Password</h1><p>Please Click </p><a href=${link}>Here</a><p> to reset your password.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {

    if (error) {

      console.log(error);

    } else {

      console.log(`Email sent: ${info.response}`);

    }

  });

};
