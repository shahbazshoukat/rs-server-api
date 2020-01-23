const fs = require('fs');
const path = require('path');
const config = require('config');

class SSLHandler {

  static async validateSSLKeys () {

    if (config.get('port') !== 4443) {

      throw new Error('port must be 4443 for secure server');

    }

    if (config.get('protocol') !== 'https') {

      throw new Error('protocol must be https for secure server');

    }

    const ssl = config.get('ssl');
    const fqdn = config.get('host');

    if (!ssl) {

      throw new Error('SSL configs missing');

    }

    if (!ssl.local && ssl.keyServer) {

      // TODO:: check keys from remote locations
      return { key: '', cert: '' };

    }

    if (!ssl.localPath) {

      throw new Error('SSL files path is missing :  invalid local path');

    }

    if (!fs.existsSync(path.resolve(`${ssl.localPath}/${fqdn}/privkey.pem`))) {

      throw new Error(`SSL key file is missing :  "${ssl.localPath}/${fqdn}/privkey.pem" not found`);

    }

    if (!fs.existsSync(path.resolve(`${ssl.localPath}/${fqdn}/fullchain.pem`))) {

      throw new Error(`SSL certificate file is missing :  "${ssl.localPath}/${fqdn}/fullchain.pem" not found`);

    }

    const certFiles = {
      key: fs.readFileSync(path.resolve(`${ssl.localPath}/${fqdn}/privkey.pem`), 'utf8'),
      cert: fs.readFileSync(path.resolve(`${ssl.localPath}/${fqdn}/fullchain.pem`), 'utf8')
    };

    return certFiles;

  }

}

module.exports = SSLHandler;
