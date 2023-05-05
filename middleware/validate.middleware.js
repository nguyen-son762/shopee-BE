"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequestSchema = validateRequestSchema;

var _expressValidator = require("express-validator");

function validateRequestSchema(req, res, next) {
  const errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
}