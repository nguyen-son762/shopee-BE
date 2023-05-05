"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

var _mongoose = require("mongoose");

const userSchema = new _mongoose.Schema({
  platform_id: {
    type: String,
    required: false,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
  first_name: {
    type: String,
    default: ""
  },
  last_name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true,
    default: ""
  },
  avatar_url: {
    type: String,
    default: ""
  },
  phone_number: {
    type: String,
    default: ""
  },
  address: [{
    name: {
      type: String,
      default: ""
    },
    phone_number: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    street: {
      type: String,
      default: ""
    },
    default: {
      type: Boolean,
      default: true
    }
  }],
  refresh_token: {
    type: String,
    default: ""
  },
  otp: {
    type: String,
    default: "PENDING",
    expires: "5m"
  },
  active: {
    type: Boolean,
    default: true
  },
  liked: [{
    product: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null
    }
  }]
});
const UserModel = (0, _mongoose.model)("User", userSchema);
exports.UserModel = UserModel;