const nodemailer = require('nodemailer');

const {
  config
} = require('../../helpers');

const defaultTransport = config.defaultMailTransport || 'gmail';
const selectedTransport = config.mail && config.mail.transports && config.mail.transports.get(defaultTransport);

const transport = nodemailer.createTransport(selectedTransport);

exports.sendCommentEmail = (to, link, comment) => {

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

  return sendEmail(mailOptions);

};

const sendEmail = options => new Promise((resolve, reject) => {

  transport.sendMail(options, (error, info) => {

    (error && reject(error)) || resolve(info);

  });

});
