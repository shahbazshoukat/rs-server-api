const nodemailer = require('nodemailer');

const {
  cLog,
  config
} = require('../../helpers');

const defaultTransport = config.defaultMailTransport || 'gmail';
const selectedTransport = config.mail && config.mail.transports && config.mail.transports.get(defaultTransport);

const transport = nodemailer.createTransport(selectedTransport);

exports.sendCommentEmail = async (to, link, comment) => {

  try {

    const mailOptions = {
      from: config.mail.addresses.account,
      to: to.email,
      subject: 'ResultSquare | New Comment',
      html:
          `<h1>ResultSquare | New Comment</h1>
        <p>New Comment added by ${comment.name}, click </p><a href=${link}>Here</a><p> to view.</p>
        <div>Name: ${comment.name}</div>
        <div>Email: ${comment.email}</div>
        <div>Comment: ${comment.text}</div>`
    };

    await sendEmail(mailOptions);

  } catch (error) {

    cLog.error(`sendCommentEmail:: Failed to send email, error:: `, error);

  }

};

const sendEmail = options => new Promise((resolve, reject) => {

  try {

    transport.sendMail(options, (error, info) => {

      (error && reject(error)) || resolve(info);

    });

  } catch (error) {

    cLog.error(`sendEmail:: Failed to send email, error:: `, error);

  }

});
