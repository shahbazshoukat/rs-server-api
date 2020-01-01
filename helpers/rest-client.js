const parse = require('xml-parser');
const request = require('request');
const rp = require('request-promise');
const fs = require('fs');
const validators = require('./validators');
const cLog = require("./console");

const makePostRequest = (url, data, file) => new Promise((resolve, reject) => {

  if (!file) {

    url = {
      url,
      form: data
    };

  }
  const req = request.post(url, (err, resp, body) => {

    if (err) {

      return reject(err);

    }

    try {

      body = JSON.parse(body);

    } catch (e) {

      return reject(e);

    }

    if (resp.statusCode >= 400) {

      return reject(body);

    }

    if (validators.propExists('status', body) && body.status !== 'success') {

      return reject(body);

    }

    if (validators.propExists('success', body) && !body.success) {

      return reject(body);

    }

    return resolve(body);

  });

  if (file) {

    const form = req.form();

    for (const d in data) {

      form.append(`${d}`, `${data[d]}`);

    }

    file && form.append('file', fs.createReadStream(file));

  }

});

const makePostMultipartRequest = (url, data, file) => new Promise((resolve, reject) => {

  const req = request.post(url, (err, resp, body) => {

    if (err) {

      return reject(err);

    }
    try {

      body = JSON.parse(body);

    } catch (e) {

      return reject(e);

    }

    if (resp.statusCode >= 400) {

      return reject(body);

    }

    if (validators.propExists('status', body) && body.status !== 'success') {

      return reject(body);

    }

    if (validators.propExists('success', body) && !body.success) {

      return reject(body);

    }

    return resolve(body);

  });

  const form = req.form();

  for (const d in data) {

    form.append(`${d}`, `${data[d]}`);

  }

  file && form.append('file', fs.createReadStream(file));

});

/**
 * Post request to post multiple files with data. Takes array of files object containg fileKey and filePath
 * @param {String} url
 * @param {Object} data
 * @param {Array} files Array containing file objects with properties 'fileKey' and 'filePath'
 * @param {Object} options
 */
function multiFilePostRequest (url, data, files, options) {

  // Adding 'options' to support headers
  options = options || {};
  return new Promise((resolve, reject) => {

    const req = request.post(url, options, (err, resp, body) => {

      if (err) {

        return reject(err);

      }
      try {

        if (resp.headers && (resp.headers['content-type'] === 'application/json' || resp.headers['content-type'] === 'application/json; charset=utf-8')) {

          // Parsing JSON
          body = JSON.parse(body);

        } else if (resp.headers && resp.headers['content-type'] === 'text/xml') {

          // Parsing XML to check if it's valid
          parse(body);

        }

      } catch (e) {

        return reject(e);

      }

      if (resp.statusCode >= 400) {

        return reject(body);

      }

      if (validators.propExists('status', body) && body.status !== 'success') {

        return reject(body);

      }

      if (validators.propExists('success', body) && !body.success) {

        return reject(body);

      }

      return resolve(body);

    });

    const form = req.form();
    for (const d in data) {

      form.append(`${d}`, `${data[d]}`);

    }
    for (const fileObj of files) {

      fileObj && fileObj.fileKey && fileObj.filePath && form.append(fileObj.fileKey, fs.createReadStream(fileObj.filePath));

    }

  });

}

const makeGetRequest = (url, headers = {}) => new Promise((resolve, reject) => {

  url = {
    url,
    headers
  };

  request.get(url, (err, resp, body) => {

    if (err) {

      return reject(err);

    }

    if (resp.statusCode >= 400) {

      return reject(body);

    }

    if (validators.propExists('status', body) && body.status !== 'success') {

      return reject(body);

    }

    if (validators.propExists('success', body) && !body.success) {

      return reject(body);

    }

    return resolve(body);

  });

});

const requestStream = (url, data) => {

  url = {
    url,
    form: data
  };

  return request.post(url);

};

const makeDeleteRequest = async (url, data, header) => {

  const options = {
    method: 'DELETE',
    uri: url,
    headers: header,
    body: data,
    json: true
  };

  const response = await rp(options);

  if (response.statusCode >= 400) throw response;

  if (validators.propExists('status', response) && response.status !== 'success') throw response;

  if (validators.propExists('success', response) && !response.success) throw response;

  return response;

};

const makePostRequestWIthHeader = (options, file) => new Promise((resolve, reject) => {

  

  const req = request.post(options, (err, resp, body) => {

    if (err) {

      cLog.error(err);

      return reject(err);

    }

    if (resp.statusCode >= 400) {

      cLog.error(body);

      return reject(body);

    }

    return resolve(body);

  });

  if (file) {

    const form = req.form();

    for (const d in data) {

      form.append(`${d}`, `${data[d]}`);

    }

    file && form.append('file', fs.createReadStream(file));

  }

});

exports.post = makePostRequest;
exports.postMultiPart = makePostMultipartRequest;
exports.multiFilePost = multiFilePostRequest;
exports.get = makeGetRequest;
exports.stream = requestStream;
exports.delete = makeDeleteRequest;
exports.postWithHeaders = makePostRequestWIthHeader;
