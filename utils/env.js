"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnv = void 0;

const getEnv = key => {
  return process.env[key] || "";
};

exports.getEnv = getEnv;