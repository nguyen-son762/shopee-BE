"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("./user.route");

Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});

var _product = require("./product.route");

Object.keys(_product).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _product[key];
    }
  });
});

var _order = require("./order.route");

Object.keys(_order).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _order[key];
    }
  });
});