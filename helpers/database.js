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
        password: dbConfig.get('password'),
        useNewUrlParser: true
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

    let dbConnectionURL = '';

    if (dbConfig.isLocal) {

      dbConnectionURL = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

    } else {

      dbConnectionURL = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbName}`;

    }

    cLog.info(dbConnectionURL);

    // const dbConnectionURL = `mongodb://${dbConfig.get('host')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

    await promisify(mongoose.connect).call(mongoose, dbConnectionURL, options);

    cLog.success(`connected to database ${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`);

  }

  static async createConnection (dbConfig) {

    const options = {
      useMongoClient: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500 // Reconnect every 500ms
    };

    if (validators.isValidStr(dbConfig.userName) && validators.isValidStr(dbConfig.password)) {

      options.auth = {
        user: dbConfig.userName,
        password: dbConfig.password
      };

    }

    const dbConnectionURL = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.envName}`;

    const connection = await mongoose.createConnection(dbConnectionURL, options);

    connection.on('error', (err) => {

      cLog.error('createConnection:: ERR:: mongoose secondary connection', err);

    });

    connection.on('disconnected', () => {

      cLog.error('createConnection:: ERR:: mongoose secondary connection disconnected');

    });

    connection.on('reconnect', () => {

      cLog.success('createConnection:: mongoose secondary connection reconnected');

    });

    cLog.success(`createConnection:: connected to database ${dbConfig.host}:${dbConfig.port}/${dbConfig.envName}`);

    return connection;

  }

  static isDbConnected () {

    return mongoose.connection.readyState === 1;

  }

}

module.exports = DatabaseHelper;
