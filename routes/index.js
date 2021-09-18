const express = require('express');
const bodyParser = require('body-parser');

const UserCtrl = require('../app/user/UserCtrl');

const Auth = require('../middleware/Auth');

const publicRoutes = require('./public/index');

const adminRoutes = require('./admin/index');

const {
  config
} = require('../helpers');

const {
  HTTPStatusCodeConstants
} = require('../constants');

const {
  cLog
} = require('../helpers');

const app = express();

app.set('json spaces', 2);

app.use(bodyParser.json({
  limit: '50mb',
  verify: (req, res, buf) => {

    req.rawBody = buf;

  }
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}));

app.use((req, res, next) => {

  if (config.allowedOrigins.indexOf(req.headers.origin) > -1) {

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  }

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );

  res.setHeader(
    'Cache-Control',
    'no-store,no-cache,must-revalidate'
  );

  res.setHeader(
    'Pragma',
    'no-cache'
  );

  next();

});

// Disable express 'powered by' headers to make server framework anonymous
app.disable('x-powered-by');

publicRoutes(app);

app.post('/api/admin/login', UserCtrl.loginUser);

app.use(Auth.Authenticate);

adminRoutes(app);

cLog.warn('NO ROUTE FOUND');

// 404
app.use((req, res) => {

  res.status(HTTPStatusCodeConstants.NOT_FOUND).json({
    success: false,
    message: 'invalid API'
  });

});

// generic errors handling - 500.
app.use((err, req, res, next) => {

  if (!err) {

    res.status(HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Cannot fulfil the request',
      detail: 'internal server error'
    });

  }

  cLog.error(err.stack || err.message || err);

  return res.status(HTTPStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Cannot fulfil the request',
    detail: err.message || 'Unexpected Server Error'
  });

});

module.exports = app;
