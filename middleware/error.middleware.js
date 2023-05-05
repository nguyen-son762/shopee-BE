"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function errorMiddleware(error, request, response, next) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return response.status(status).json({
    status,
    message
  });
}

var _default = errorMiddleware;
exports.default = _default;