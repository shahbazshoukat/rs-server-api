const express = require('express');
const bodyParser = require('body-parser');
// Middlewares
const Auth = require('../middleware/Auth');
// Routes
const board = require('./Board');
const result = require('./Result');
const section = require('./Section');
const user = require('./User');
// Modules
const {
  ErrorCodesConstants
} = require('../constants');
const {
  cLog
} = require('../helpers');

// Configure Express App and Routes
const app = express();

app.set('json spaces', 2);

// Configure body parser for POST requests
app.use(bodyParser.json({
  limit: '300mb',
  verify: (req, res, buf) => {

    req.rawBody = buf;

  }
}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '300mb',
  parameterLimit: 1000000
}));

// Disable express 'powered by' headers to make server framework anonymous
app.disable('x-powered-by');

app.use('/api/', board);
app.use('/api/', result);
app.use('/api/', section);
app.use('/api/', user);

// token verification only for services callbacks
app.use(Auth.AuthenticateCallbacks);

// Auth Middleware (token + subdomain + UA verification)
app.use(Auth.Authenticate);

// 404
app.use((req, res) => {

  res.status(ErrorCodesConstants.NOT_FOUND).json({
    success: false,
    message: 'invalid API'
  });

});

// generic errors handling - 500.
app.use((err, req, res, next) => {

  if (!err) {

    res.status(ErrorCodesConstants.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Cannot fulfil the request',
      detail: 'internal server error'
    });

  }

  cLog.error(err.stack || err.message || err);

  return res.status(ErrorCodesConstants.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Cannot fulfil the request',
    detail: err.message || 'Unexpected Server Error'
  });

});

module.exports = app;
