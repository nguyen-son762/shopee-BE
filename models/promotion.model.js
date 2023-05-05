"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

var _mongoose = require("mongoose");

const promotionSchema = new _mongoose.Schema({
  value: {
    type: Number,
    default: 0
  },
  condition: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  }
});
const UserModel = (0, _mongoose.model)("Promotion", promotionSchema);
exports.UserModel = UserModel;