const https = require('https');
const http = require('http');
const expressRoutes = require('./routes/index');

const {
  cLog, config, database, ssl
} = require('./helpers');

let server = http.Server(expressRoutes);

const startServer = async () => {

  const SSL = config.get('ssl');

  if (SSL.enabled) {

    cLog.info('startServer:: validating SSL credentials');

    try {

      const { key, cert } = await ssl.validateSSLKeys();

      const certOptions = { key, cert };

      server = https.createServer(certOptions, expressRoutes);

    } catch (error) {

      cLog.error('startServer:: SSL credentials error', error);

      process.exit(1);

    }

  }

  try {

    // Database Connection
    await database.connect();

  } catch (error) {

    cLog.error('startServer:: Database Connection Error', error);

    process.exit(1);

  }

  /* Start the Server */
  const apiServer = server.listen(config.port, (error) => {

    if (error) {

      return cLog.error('startServer:: launching server error ', error);

    }

    cLog.success(`${SSL.enabled ? 'Secure' : ''} API server is live at ${config.protocol}://${config.host}:${config.port}`);

  });

  apiServer.timeout = 4 * 60 * 1000;

};

process.on('uncaughtException', (err) => {

  cLog.error('Uncaught Exception thrown', err.stack);

});

process.on('unhandledRejection', (reason, p) => {

  cLog.error('Unhandled Rejection at: Promise', p, 'reason:', reason.stack);

});

// Start API Server
startServer();

module.exports = server;
module.exports.stop = () => {

  server.close();

};
