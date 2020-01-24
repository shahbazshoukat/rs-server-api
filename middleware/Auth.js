const jsonwebtoken = require('jsonwebtoken');
const useragent = require('useragent');
const AuthException = require('../exceptions/AuthException');
const User = require('../app/user/User');

const {
  config,
  cLog,
  validators
} = require('../helpers');

const verifyToken = (token, ua, cb) => {

  if (!validators.isValidStr(token)) {

    cLog.error('No auth token provided');

    return cb(new AuthException('No auth token provided', 401, {
      success: false,
      details: null
    }).toJson());

  }

  jsonwebtoken.verify(token, config.get('secretKey'), (err, decoded) => {

    if (err) {

      cLog.error('invalid or expired auth token', err);

      return cb(new AuthException('invalid or expired auth token', 401, {
        success: false,
        details: err
      }).toJson());

    }

    if (!decoded) {

      cLog.error('failed to decode/validate user info');

      return cb(new AuthException('failed to validate user info', 401, {
        success: false,
        details: null
      }).toJson());

    }

    if (!validators.isValidId(decoded._id) || !validators.isValidStr(decoded.email) || !validators.isValidStr(decoded.ua)) {

      cLog.error('bad token for user', decoded.email, 'user agent:', decoded.ua);

      return cb(new AuthException('bad token', 401, {
        success: false,
        details: null
      }).toJson());

    }

    if (ua && decoded.ua !== ua.toString()) {
      // return cb({
      //   success: false,
      //   status: 403,
      //   message: 'un-authorized agent',
      //   details: null
      // });
    }

    let data;

    const q = {
      _id: decoded._id,
      email: decoded.email
    };

    User.findOne(q).lean().exec((error, user) => {

      if (error) {

        cLog.error('error getting user details', decoded.email, error);

        return cb(new AuthException('error getting user details', 500, {
          success: false,
          details: error
        }).toJson());

      }

      if (!user) {

        cLog.error('invalid token. user not found', user);

        return cb(new AuthException('invalid token. user not found', 401, {
          success: false,
          details: error
        }).toJson());

      }

      if (user.lastToken !== token) {

        cLog.error('user auth token tempered or invalid', user.email, user.name, user.status);

        return cb(new AuthException('auth token tempered or invalid', 401, {
          success: false,
          details: error
        }).toJson());

      }

      cb(null, user, data);

    });

  });

};

exports.verifyToken = verifyToken;

exports.Authenticate = (req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const ua = useragent.parse(req.headers['user-agent']);

  cLog.info(`Authenticate:: Authenticating token:: ${token} ua:: ${ua}`);

  verifyToken(token, ua, (err, user, data) => {

    if (err) {

      cLog.error('unable to verify token', err.message);

      return res.status(err.code).json(err);

    }

    req.user = Object.assign({}, user);

    req.token = token;

    if (data) req.data = Object.assign(req.data || {}, data || {});

    next && next();

  });

};
/**
 * Subset of Authenticate method, will not check subdomain and user-agent
 * @param req
 * @param res
 * @param next
 * @constructor
 */
exports.AuthenticateCallbacks = (req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  verifyToken(token, null, (err, user, data) => {

    if (err) {

      cLog.error('unable to verify token', err.message);

      return res.status(err.code).json(err);

    }

    req.user = Object.assign({}, user);

    req.token = token;

    if (data) req.data = Object.assign(req.data || {}, data || {});

    next && next();

  });

};
