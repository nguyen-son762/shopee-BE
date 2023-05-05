"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSMS = void 0;

var _sms = require("../services/sms.service");

var _env = require("./env");

const sendSMS = async (phonenumber, body) => {
  await _sms.smsClient.messages.create({
    to: phonenumber,
    body,
    messagingServiceSid: (0, _env.getEnv)("TWILIO_MESSAGING_SERVICE_ID")
  });
};

exports.sendSMS = sendSMS;