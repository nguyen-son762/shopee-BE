"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRoutes = void 0;

var _order = require("./../controllers/order.controller");

var _route = require("../constants/route.constant");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRoutes = _express.default.Router();

exports.orderRoutes = orderRoutes;
orderRoutes.get(_route.orderEndpoints.GET, _order.OrderController.get);
orderRoutes.get(_route.orderEndpoints.GET_ALL, _order.OrderController.getAll);
orderRoutes.get(_route.orderEndpoints.GET_STATUS, _order.OrderController.getStatus);
orderRoutes.post(_route.orderEndpoints.UPDATE, _order.OrderController.updateStatus);
orderRoutes.post(_route.orderEndpoints.PURCHASE, _order.OrderController.purchase);