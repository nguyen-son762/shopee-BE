"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = authMiddleware;

var _auth = require("../utils/auth");

function authMiddleware(req, res, next) {
  const token = (req.header("Authorization") || "").replace("Bearer ", "");
  const user = (0, _auth.decodeToken)(token);

  if (user) {
    next();
  } else {
    return res.status(401).json({
      message: "Not authorized to access this resource"
    });
  }
}