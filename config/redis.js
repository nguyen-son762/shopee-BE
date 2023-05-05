"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = void 0;

var _redis = require("redis");

const client = (0, _redis.createClient)({
  url: "rediss://red-cg21svg2qv25u2jg5tl0:dWfi5Z1DwfDCh1gpVF2oSkafngVEZWsq@singapore-redis.render.com:6379",
  legacyMode: true
});
exports.client = client;