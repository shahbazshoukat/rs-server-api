const { promisify } = require('util');

const mongoose = require('mongoose');
const config = require('config');
const cLog = require('./console');
const validators = require('./validators');

class DatabaseHelper {

  static async connect () {

    const dbConfig = config.get('database');

    const options = {
      useMongoClient: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500 // Reconnect every 500ms
    };

    if (validators.isValidStr(dbConfig.get('userName')) && validators.isValidStr(dbConfig.get('password'))) {

      options.auth = {
        user: dbConfig.get('userName'),
        password: dbConfig.get('password')
      };

    }

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {

      cLog.error('ERR:: mongoose default connection', err);

    });

    mongoose.connection.on('disconnected', () => {

      cLog.error('ERR:: mongoose default connection disconnected');

    });

    mongoose.connection.on('reconnect', () => {

      cLog.success('mongoose default connection reconnected');

    });

    const dbConnectionURL = `mongodb://${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

    await promisify(mongoose.connect).call(mongoose, dbConnectionURL, options);

    cLog.success(`connected to database ${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);

  }

  static isDbConnected () {

    return mongoose.connection.readyState === 1;

  }

}

module.exports = DatabaseHelper;
