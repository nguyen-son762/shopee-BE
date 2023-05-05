"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwError = void 0;

var _httpException = require("../exception/httpException");

const throwError = (next, status = 400, msg = "There was an error on the server") => {
  next(new _httpException.HttpException(status, msg));
};

exports.throwError = throwError;