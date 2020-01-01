
const validators = require('./validators');
const cLog = require('./console');

exports.resCallback = (res, strict, doc) => (err, docs) => {

  cLog.info('Send response call back');

  if (err) {

    cLog.info('Send error response call back');

    return res.status(500).json({
      success: false,
      message: 'something went wrong',
      details: err
    });

  }

  if (strict && !docs) {

    cLog.info('Resource not found');

    return res.status(404).json({
      success: false,
      message: 'resource not found',
      details: null
    });

  }

  cLog.info('Sending success response call back');

  res.json({
    success: true,
    data: doc || docs
  });

};

exports.handleDBCallback = (res, checkDoc, cb) => (err, docs) => {

  if (err) {

    return res.status(500).json({
      success: false,
      message: 'something went wrong',
      details: err
    });

  }

  if (checkDoc && !docs) {

    return res.status(404).json({
      success: false,
      message: 'resource not found',
      details: null
    });

  }

  cb(docs);

};

exports.handleFileUpload = (req, res, strict, cb) => (err, id, file) => {

  if (err) {

    return res.status(500).json({
      success: false,
      message: 'file upload failed',
      details: err
    });

  }

  if (!(id && file) && req.validationError) {

    return res.status(500).json({
      success: false,
      message: 'file upload failed',
      details: req.validationError
    });

  }

  if (strict && !(id && file)) {

    return res.status(500).json({
      success: false,
      message: 'file upload failed',
      details: null
    });

  }

  cb(id, file);

};

exports.getPageOptions = (req) => {

  if (!req) {

    req = {
      query: {
        page: 1,
        limit: 10,
        order: 'updatedAt'
      }
    };

  }

  const options = {
    page: +req.query.page || 1,
    limit: +req.query.limit || 10,
    leanWithId: true,
    lean: true,
    sort: {
      updatedAt: -1
    }
  };

  if (req.query.order) {

    options.sort = {};
    if (req.query.order[0] === '-') {

      options.sort[(req.query.order.split('-')[1] || 'updatedAt')] = -1;

    } else {

      options.sort[(req.query.order.toString() || 'updatedAt')] = 1;

    }

  }
  return options;

};

exports.getQueryArray = (str) => {

  let ids = [];
  if (!validators.isValidStr(str)) {

    return ids;

  }
  if (str.indexOf(',') > 0) {

    ids = str.split(',');

  } else {

    ids = [str];

  }

  return ids;

};
exports.inObject = (object, value, key) => {

  let tempObjectVal = '';
  for (const inObjectKey in object) {

    tempObjectVal = '';

    if (key) {

      tempObjectVal = object[inObjectKey][key].toString();

    } else {

      tempObjectVal = object[inObjectKey].toString();

    }

    if (tempObjectVal === value) {

      return true;

    }

  }

  return false;

};
