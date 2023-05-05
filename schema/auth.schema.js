"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = exports.registerSchema = void 0;

var _expressValidator = require("express-validator");

const registerSchema = [(0, _expressValidator.body)("email").isEmail().withMessage("email must contain a valid email address"), (0, _expressValidator.body)("first_name").isLength({
  min: 2
}).withMessage("first_name must be at least 2 characters long"), (0, _expressValidator.body)("last_name").isLength({
  min: 2
}).withMessage("last_name must be at least 2 characters long"), (0, _expressValidator.body)("password").isLength({
  min: 3
}).withMessage("password must be at least 3 characters long"), (0, _expressValidator.body)("phone_number").isLength({
  min: 8,
  max: 15
}).withMessage("phone_number must be min 8 characters")];
exports.registerSchema = registerSchema;
const loginSchema = [(0, _expressValidator.body)("phone_number").isLength({
  min: 8,
  max: 15
}).withMessage("phone_number must be min 8 characters"), (0, _expressValidator.body)("password").isLength({
  min: 3
}).withMessage("password must be at least 3 characters long")];
exports.loginSchema = loginSchema;