"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smsClient = void 0;

var _env = require("../utils/env");

var _twilio = _interopRequireDefault(require("twilio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const smsClient = (0, _twilio.default)((0, _env.getEnv)("TWILIO_ACCOUNT_SID"), (0, _env.getEnv)("TWILIO_AUTH_TOKEN"), {
  logLevel: "debug"
});
exports.smsClient = smsClient;