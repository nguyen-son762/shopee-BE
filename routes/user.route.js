"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _route = require("../constants/route.constant");

var _validate = require("../middleware/validate.middleware");

var _auth = require("../schema/auth.schema");

var _user = require("../controllers/user.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.memoryStorage();

const userRoutes = _express.default.Router();

exports.userRoutes = userRoutes;
const uploadImage = (0, _multer.default)({
  storage: storage,
  limits: {
    fieldSize: 50 * 1024 * 1024
  }
}).single("avatar_url");
userRoutes.post(_route.authEndpoints.LOGIN, _auth.loginSchema, _validate.validateRequestSchema, _user.UsersController.login);
userRoutes.post(_route.authEndpoints.LIKED, _user.UsersController.liked);
userRoutes.get(_route.authEndpoints.TOTAL, _user.UsersController.getTotal);
userRoutes.post(_route.authEndpoints.LOGIN_WITH_PLATFORM, _user.UsersController.loginWithGoogleOrFacebook);
userRoutes.post(_route.authEndpoints.REGISTER, _auth.registerSchema, _validate.validateRequestSchema, _user.UsersController.register);
userRoutes.post(_route.authEndpoints.REGISTER_BY_PHONE_NUMBER, _validate.validateRequestSchema, _user.UsersController.registerByPhonenumber);
userRoutes.patch(_route.authEndpoints.UPDATE, uploadImage, _user.UsersController.update);
userRoutes.post(_route.authEndpoints.VERIFY, _user.UsersController.verifyOTP);
userRoutes.get(_route.authEndpoints.LIST, _user.UsersController.getListUser);