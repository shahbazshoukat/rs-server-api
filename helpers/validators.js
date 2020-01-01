const ObjectId = require('mongoose').Types.ObjectId;

const config = require('config');

const cLog = require('./console');

class Validators {

  static isValidId (str) {

    try {

      const nid = new ObjectId(str);

      return (nid.equals(str) ? nid : null);

    } catch (e) {

      return null;

    }

  }

  static isValidStr (str) {

    if (!str) {

      return false;

    }

    return (str && typeof (str) === 'string' && str.trim() && str !== '');

  }

  static isValidJSON (str) {

    if (!str) {

      return false;

    }

    if (typeof str === 'string') {

      try {

        str = JSON.parse(str);

      } catch (e) {

        return false;

      }

    }

    return (!!Object.keys(str).length);

  }

  static isValidPassword (pPassword) {

    if (config.activatePasswordStrength) {

      if (/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pPassword)) {

        return true;

      }

      return false;

    }

    return Validators.isValidStr(pPassword);

  }

  static getParsedJson (data) {

    if (!data) {

      return null;

    }

    if (typeof data === 'string') {

      try {

        return JSON.parse(data);

      } catch (e) {

        cLog.error(e.message);

        return null;

      }

    } else if (Object.keys(data).length) {

      return data;

    }

  }

  static propExists (key, obj) {

    return (Object.prototype.hasOwnProperty.call(obj, key) && (key in obj));

  }

  static isArray (variable) {

    return (variable && (Object.prototype.toString.call(variable) === '[object Array]') && Array.isArray(variable));

  }

  static parseInteger (value, defaultValue) {

    try {

      value = parseInt(value, 10);

      return Number.isNaN(value) ? defaultValue : value;

    } catch (ex) {

      return defaultValue;

    }

  }

  static isPNG (fileName) {

    if (!fileName || !fileName.length || fileName.lastIndexOf('.') === -1) {

      return false;

    }

    return fileName.substring(fileName.lastIndexOf('.') + 1) === 'png';

  }

  static isObject (value) {

    return value && typeof value === 'object' && value.constructor === Object;

  }

  static isString (value) {

    if (!value) {

      return false;

    }

    return (value && typeof (value) === 'string' && value.trim());

  }

  static isBoolean (value) {

    try {

      return typeof JSON.parse(value) === 'boolean';

    } catch (err) {

      return false;

    }

  }

  static isValidDomain (email, domain) {

    if (this.isValidStr(email) && this.isValidStr(domain)) {

      const pattern = new RegExp(`@?(${domain})$`, 'i');
      return pattern.test(email);

    }
    return false;

  }

  static magicModeEnable () {

    return Validators.isBoolean(config.magicMode) && config.magicMode;

  }

  static isFunction (fn) {

    return fn && typeof fn === 'function';

  }

  static isUndefined (obj) {

    return typeof obj === 'undefined';

  }

  static isNumber (value) {

    return typeof value === 'number';

  }

}

module.exports = Validators;
