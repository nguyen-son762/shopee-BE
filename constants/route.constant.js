"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderEndpoints = exports.productEndpoints = exports.authEndpoints = void 0;
const ROOT_ENDPOINT = "/api";
const authEndpoints = {
  AUTH: `${ROOT_ENDPOINT}/auth`,
  LOGIN: "/login",
  REGISTER: "/register",
  UPDATE: "/update",
  LOGIN_WITH_PLATFORM: "/platform",
  VERIFY: "/verify",
  REGISTER_BY_PHONE_NUMBER: "/register/phone",
  LIKED: "/liked",
  TOTAL: '/total',
  LIST: '/list'
};
exports.authEndpoints = authEndpoints;
const productEndpoints = {
  PRODUCT: `${ROOT_ENDPOINT}/product`,
  CREATE: "/create",
  GET: "/",
  RECOMMEND: "/recommend",
  GET_BY_ID: '/detail/:product_id'
};
exports.productEndpoints = productEndpoints;
const orderEndpoints = {
  ORDER: `${ROOT_ENDPOINT}/order`,
  GET: "/:user_id",
  GET_ALL: "/",
  CREATE: "/create",
  PURCHASE: "/purchase",
  GET_STATUS: "/status/:user_id",
  UPDATE: "/status/:user_id"
};
exports.orderEndpoints = orderEndpoints;