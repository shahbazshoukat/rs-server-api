const dateFormat = require('dateformat');
const Path = require('path');
const { inspect } = require('util');
const config = require('config');
const LogDNAWinston = require('logdna-winston');
const winston = require('winston');

const getFormattedMsg = (...argss) => {

  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
  const data = {};
  const stacklist = (new Error()).stack.split('\n').slice(3);
  const s = stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);
  if (sp && sp.length === 5) {

    data.method = sp[1];
    data.path = sp[2];
    data.line = sp[3];
    data.pos = sp[4];
    data.file = Path.basename(data.path);
    data.path = data.path.replace(`${config.projectRoot}/`, '');

  }
  const strArgs = [];
  for (let index = 0; index < argss.length; index += 1) {

    let arg = argss[index];
    if (typeof arg !== 'string') {

      arg = inspect(arg);

    }
    strArgs.push(arg);

  }
  return [`${data.path}:${data.line}`].concat(...strArgs).join(' ');

};

const myFormat = winston.format.printf(info => `[${dateFormat(new Date(info.timestamp), 'yyyy-mm-dd HH:MM:ss.l')}]  ${info.message}`);

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'cyan'
  }
};

winston.addColors(myCustomLevels.colors);

const consoleTransport = new winston.transports.Console({
  handleExceptions: true,
  json: false,
  colorize: true,
  prettyPrint: true,
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.colorize({
    all: true
  }), myFormat)
});

const logger = winston.createLogger({
  colorize: true,
  levels: myCustomLevels.levels,
  level: 'info',
  json: true,
  prettyPrint: true
});

logger.add(consoleTransport);

// if (config.logDNA.enabled) {

//   const logDnaOptions = {
//     key: config.logDNA.ingestionKey,
//     hostname: `${config.host}`,
//     app: `${config.environmentName}-server-api`,
//     env: `${config.geoLocation}-${config.deploymentType}`,
//     level: 'info',
//     tags: [`geoLocation:${config.geoLocation}`, `deploymentType:${config.deploymentType}`, `environmentName:${config.environmentName}`, 'component:server-api'],
//     format: winston.format.simple(),
//     index_meta: false // Defaults to false, when true ensures meta object will be searchable
//   };

//   // FIXME: only add this in production/non-prod ? Only add this line in order to track exceptions

//   logDnaOptions.handleExceptions = true;
//   logger.add(new LogDNAWinston(logDnaOptions));

// }

const getLogger = type => (...args) => {

  logger[type](getFormattedMsg(...args));

};

// eslint-disable-next-line no-console
console.log = getLogger('info');
// eslint-disable-next-line no-console
console.info = getLogger('info');
// eslint-disable-next-line no-console
console.error = getLogger('error');
// eslint-disable-next-line no-console
console.warn = getLogger('warn');
// eslint-disable-next-line no-console
console.error = getLogger('error');

module.exports = {
  error: getLogger('error'),
  warn: getLogger('warn'),
  success: getLogger('success'),
  info: getLogger('info')
};
