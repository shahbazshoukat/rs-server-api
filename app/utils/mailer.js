const nodemailer = require('nodemailer');

const {
  config
} = require('../../helpers');

const defaultTransport = config.defaultMailTransport || 'gmail';
const selectedTransport = config.mail.transports.get(defaultTransport);

const transport = nodemailer.createTransport(selectedTransport);

exports.sendCommentEmail = (to, link) => {

  const mailOptions = {
    from: config.mail.addresses.account,
    to: to.email,
    subject: 'ResultSquare | New Comment',
    html:
        `<h1>ResultSquare | New Comment</h1><p>New Comment added, click </p><a href=${link}>Here</a><p> to view.</p>`
  };

  return sendEmail(mailOptions);

};

const sendEmail = options => new Promise((resolve, reject) => {

  transport.sendMail(options, (error, info) => {

    (error && reject(error)) || resolve(info);

  });

});
