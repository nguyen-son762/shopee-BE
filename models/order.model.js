"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = exports.OrderStatusEnums = void 0;

var _mongoose = require("mongoose");

let OrderStatusEnums;
exports.OrderStatusEnums = OrderStatusEnums;

(function (OrderStatusEnums) {
  OrderStatusEnums["INCART"] = "INCART";
  OrderStatusEnums["ORDERING"] = "ORDERING";
  OrderStatusEnums["PICKING"] = "PICKING";
  OrderStatusEnums["ORDERED"] = "ORDERED";
  OrderStatusEnums["DELIVERING"] = "DELIVERING";
  OrderStatusEnums["DONE"] = "DONE";
})(OrderStatusEnums || (exports.OrderStatusEnums = OrderStatusEnums = {}));

const OrderSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    required: false
  },
  product: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  model: {
    type: String,
    default: ""
  },
  phonenumber: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  promotion_code: {
    type: String,
    default: ""
  },
  note: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: OrderStatusEnums,
    required: true,
    default: OrderStatusEnums.INCART
  },
  amount: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});
const OrderModel = (0, _mongoose.model)("Order", OrderSchema);
exports.OrderModel = OrderModel;