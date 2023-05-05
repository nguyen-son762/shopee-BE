"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;

var _auth = require("../constants/auth.constant");

var _code = require("../constants/code.constant");

var _httpException = require("../exception/httpException");

var _auth2 = require("../utils/auth");

var _user = require("../models/user.model");

var _message = require("../constants/message.constant");

class UserService {
  static async register(user) {
    const userDb = await _user.UserModel.findOne({
      email: user.email
    });

    if (userDb) {
      throw new _httpException.HttpException(_code.HttpStatus.CONFLICT, _message.ERROR_MSG.USER_EXISTED);
    }

    const encodePwd = await (0, _auth2.encodePassword)(user.password);
    const userResponse = new _user.UserModel({ ...user,
      password: encodePwd
    });
    const newUser = await userResponse.save();

    if (!newUser) {
      throw new _httpException.HttpException(_code.HttpStatus.NOT_FOUND, _message.ERROR_MSG.SERVER_FAIL);
    }

    newUser.refresh_token = (0, _auth2.getToken)(newUser, `${_auth.TIME_EXPIRED_REFRESH_TOKEN_HOURS}h`);
    await _user.UserModel.findOneAndUpdate({
      _id: newUser._id
    }, newUser, {
      upsert: true
    });
    return newUser;
  }

  static async login(user) {
    const userDb = await _user.UserModel.findOne({
      phone_number: user.phone_number
    });

    if (!userDb) {
      throw new _httpException.HttpException(_code.HttpStatus.BAD_REQUEST, _message.ERROR_MSG.USER_NOT_FOUND);
    }

    const isSamePassword = await (0, _auth2.comparePassword)(user.password, userDb.password);

    if (isSamePassword) {
      return userDb;
    }

    throw new _httpException.HttpException(_code.HttpStatus.BAD_REQUEST, _message.ERROR_MSG.USER_NOT_FOUND);
  }

}

exports.UserService = UserService;