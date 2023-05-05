"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPicture = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadPicture = async req => {
  return new Promise((resolve, reject) => {
    const base64String = req.body.avatar_url;

    _cloudinary.default.v2.uploader.upload("data:image/svg+xml;base64," + base64String).then(data => {
      resolve(data.url);
    }).catch(err => {
      reject(err);
    });
  });
};

exports.uploadPicture = uploadPicture;