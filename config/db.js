"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = void 0;

var _env = require("../utils/env");

var _mongoose = require("mongoose");

const connectDB = async () => {
  // 4. Connect to MongoDB
  try {
    (0, _mongoose.set)("strictQuery", false);
    await (0, _mongoose.connect)((0, _env.getEnv)("MONGO_DB_URI"), {
      autoIndex: false
    });
    console.log("Connect to database succeed");
  } catch {
    console.log("Connect to database failed");
  }
};

exports.connectDB = connectDB;