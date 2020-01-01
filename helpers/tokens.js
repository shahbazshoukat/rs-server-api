
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

exports.getInviteToken = user => jsonwebtoken.sign({
  user: user.user,
  email: user.email
}, config.get('secretKey'), {
  expiresIn: config.timeouts.invite
});

exports.getLoginToken = (user, ua) => jsonwebtoken.sign({
  _id: user._id,
  email: user.email,
  ua
}, config.get('secretKey'), {
  expiresIn: config.timeouts.login
});

exports.getVerificationToken = user => jsonwebtoken.sign(user, config.get('secretKey'), {
  expiresIn: config.timeouts.signup
});

exports.getForgotPassToken = user => jsonwebtoken.sign({
  id: user._id,
  email: user.email
}, config.get('secretKey'), {
  expiresIn: config.timeouts.forgotPassword
});

exports.getPublicApiToken = () => jsonwebtoken.sign({
  publicApiKey: config.get('publicApi').secretKey
}, config.get('secretKey'));

exports.getBuildUserToken = (user, ua, publicApiKey, exec) => jsonwebtoken.sign({
  _id: user._id,
  email: user.email,
  ua,
  publicApiKey,
  exec
}, config.get('secretKey'), {
  expiresIn: config.timeouts.buildUser
});

exports.verify = token => jsonwebtoken.verify(token, config.get('secretKey'));
