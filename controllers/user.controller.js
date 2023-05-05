"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersController = void 0;

var _code = require("../constants/code.constant");

var _auth = require("../utils/auth");

var _error = require("../utils/error");

var _user = require("../models/user.model");

var _auth2 = require("../constants/auth.constant");

var _auth3 = require("../services/auth.service");

var _upload = require("../utils/upload");

var _otpGenerator = _interopRequireDefault(require("otp-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  static async register(req, res, next) {
    try {
      const {
        username,
        first_name,
        last_name,
        email,
        phone_number,
        password
      } = req.body;

      const otp = _otpGenerator.default.generate(4, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false
      });

      const verifyUser = await _user.UserModel.find({
        phone_number
      });

      if (verifyUser) {
        return res.status(_code.HttpStatus.FOUND).json({
          msg: "User is existed"
        });
      } // await sendSMS(phone_number, `Your Shopee Fake verification code: ${otp}`);


      const newUser = await _auth3.UserService.register({
        username,
        first_name,
        last_name,
        email,
        phone_number,
        password,
        otp,
        active: false
      });
      const result = {
        data: newUser,
        access_token: (0, _auth.getToken)(newUser),
        refresh_token: newUser.refresh_token
      };
      res.status(_code.HttpStatus.OK).json(result);
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async registerByPhonenumber(req, res, next) {
    try {
      const {
        phone_number,
        password,
        first_name,
        last_name
      } = req.body;

      const otp = _otpGenerator.default.generate(4, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false
      });

      const verifyUser = await _user.UserModel.findOne({
        phone_number
      });

      if (verifyUser) {
        return res.status(_code.HttpStatus.FOUND).json({
          msg: "User is existed"
        });
      }

      const newUser = await _auth3.UserService.register({
        first_name,
        last_name,
        phone_number,
        password,
        otp,
        active: false
      });
      const result = {
        data: newUser,
        access_token: (0, _auth.getToken)(newUser),
        refresh_token: newUser.refresh_token
      }; // await sendSMS(phone_number, `Your Shopee Fake verification code: ${otp}`);

      res.status(_code.HttpStatus.OK).json(result);
    } catch (err) {
      console.warn("err", err);
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async login(req, res, next) {
    try {
      const {
        phone_number,
        password
      } = req.body;
      const user = await _auth3.UserService.login({
        phone_number,
        password
      });

      if (!user || !user.active) {
        return res.status(_code.HttpStatus.BAD_REQUEST).json({
          msg: "User is not found"
        });
      }

      const pwdDecoded = (0, _auth.decodeToken)(user.refresh_token);
      let refresh_token = user.refresh_token;
      let userNeedUpdated;

      if (!pwdDecoded) {
        const newToken = (0, _auth.getToken)(user, `${_auth2.TIME_EXPIRED_REFRESH_TOKEN_HOURS}h`);
        userNeedUpdated = await _user.UserModel.findOneAndUpdate({
          _id: user.id
        }, {
          refresh_token: newToken
        }, {
          new: true
        });
        refresh_token = userNeedUpdated.refresh_token;
      }

      const result = {
        data: userNeedUpdated || user,
        access_token: (0, _auth.getToken)(user),
        refresh_token
      };
      res.status(_code.HttpStatus.OK).json(result);
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async loginWithGoogleOrFacebook(req, res, next) {
    try {
      const {
        _id,
        first_name,
        last_name,
        avatar_url,
        email,
        username
      } = req.body;
      const user = await _user.UserModel.findOneAndUpdate({
        platform_id: _id
      }, {
        $set: {
          first_name,
          last_name,
          avatar_url,
          email,
          username
        }
      }, {
        upsert: true
      });

      if (user) {
        return res.status(_code.HttpStatus.OK).json({
          data: user,
          access_token: (0, _auth.getToken)(user)
        });
      }
    } catch (err) {
      return (0, _error.throwError)(next, err?.status || err?.http_code, err?.message);
    }
  }

  static async verifyOTP(req, res, next) {
    try {
      const {
        access_token,
        otp
      } = req.body;
      const data = (0, _auth.decodeToken)(access_token);
      const user = await _user.UserModel.findById(data._id);

      if (user && user.otp === otp) {
        user.active = true;
        await user.save();
        return res.status(_code.HttpStatus.OK).json({
          data: user,
          access_token: (0, _auth.getToken)(user)
        });
      }

      return res.status(_code.HttpStatus.BAD_GATEWAY).json({
        message: "Fail"
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status || err?.http_code, err?.message);
    }
  }

  static async update(req, res, next) {
    try {
      const user = req.body;

      if (user.avatar_url) {
        const url = await (0, _upload.uploadPicture)(req);
        user.avatar_url = url;
      }

      const userDb = await _user.UserModel.findOneAndUpdate({
        _id: user._id
      }, {
        $set: { ...user
        }
      }, {
        upsert: true,
        new: true
      });
      return res.json({
        data: userDb
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status || err?.http_code, err?.message);
    }
  }

  static async liked(req, res, next) {
    try {
      const {
        user_id,
        product
      } = req.body;
      const userDb = await _user.UserModel.findOne({
        _id: user_id
      });
      const likedProductDb = userDb.liked ? [...userDb.liked] : [];
      const likedProducts = likedProductDb.find(item => item.product.toString() === product) ? likedProductDb.filter(item => item.product.toString() !== product) : likedProductDb.concat({
        product
      });
      const user = await _user.UserModel.findOneAndUpdate({
        _id: user_id
      }, {
        liked: likedProducts
      }, {
        upsert: true,
        new: true
      });
      return res.json({
        data: user
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status || err?.http_code, err?.message);
    }
  }

  static async getTotal(req, res, next) {
    try {
      const total = await _user.UserModel.find().countDocuments();
      return res.json({
        total
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status || err?.http_code, err?.message);
    }
  }

  static async getListUser(req, res, next) {
    try {
      const limit = 10;
      const {
        page = 1
      } = req.query;
      const users = await _user.UserModel.find().skip((Number(page) - 1) * limit).limit(limit);
      const total = await _user.UserModel.find().countDocuments();
      return res.status(_code.HttpStatus.OK).json({
        data: users,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(total / limit),
        total
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status || err?.http_code, err?.message);
    }
  }

}

exports.UsersController = UsersController;