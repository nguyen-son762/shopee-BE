"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryModel = void 0;

var _mongoose = require("mongoose");

const categorySchema = new _mongoose.Schema({
  name: {
    type: String,
    default: ""
  }
});
const CategoryModel = (0, _mongoose.model)("Category", categorySchema);
exports.CategoryModel = CategoryModel;