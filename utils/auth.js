"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.encodePassword = exports.decodeToken = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = require("bcrypt");

var _auth = require("../constants/auth.constant");

var _env = require("./env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getToken = (user, expired) => {
  if (!expired) {
    expired = `${_auth.TIME_EXPIRED_ACCESS_TOKEN_HOURS}h`;
  }

  return _jsonwebtoken.default.sign(user.toJSON(), (0, _env.getEnv)("JWT_SECRET_KEY"), {
    expiresIn: expired
  });
};

exports.getToken = getToken;

const decodeToken = token => {
  try {
    const decoded = _jsonwebtoken.default.verify(token, (0, _env.getEnv)("JWT_SECRET_KEY"));

    return decoded;
  } catch {
    return "";
  }
};

exports.decodeToken = decodeToken;

const encodePassword = async password => {
  return await (0, _bcrypt.hash)(password, _auth.SALT_ROUNDS);
};

exports.encodePassword = encodePassword;

const comparePassword = async (password, hashPassword) => {
  return await (0, _bcrypt.compare)(password, hashPassword);
};

exports.comparePassword = comparePassword;