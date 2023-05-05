"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderController = void 0;

var _code = require("../constants/code.constant");

var _order = require("../models/order.model");

var _error = require("../utils/error");

class OrderController {
  static async get(req, res, next) {
    try {
      const {
        user_id,
        page
      } = req.params;
      const status = req.query.status;
      let query = {};

      if (user_id) {
        query = {
          user: user_id
        };
      }

      if (status) {
        query = { ...query,
          status
        };
      }

      const orders = await _order.OrderModel.find(query).populate({
        path: "product",
        populate: {
          path: "category"
        }
      });
      const total = await _order.OrderModel.find(query).countDocuments();

      if (orders) {
        return res.status(_code.HttpStatus.OK).json({
          data: orders,
          total,
          page: Number(page),
          limit: Number(10),
          totalPage: Math.ceil(total / 10)
        });
      }

      return res.status(_code.HttpStatus.OK).json({
        data: []
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async getAll(req, res, next) {
    try {
      let result = {};
      const {
        page = 1,
        status,
        from,
        to
      } = req.query;
      let query = {
        createdAt: {
          $gte: new Date(from),
          $lt: new Date(to)
        }
      };

      if (status) {
        query = { ...query,
          status
        };
      }

      const orders = await _order.OrderModel.find(query).skip((Number(page) - 1) * 10).limit(20).populate([{
        path: "product",
        populate: {
          path: "category"
        }
      }, {
        path: "user"
      }]);
      const total = await _order.OrderModel.countDocuments(query);

      if (orders) {
        return res.status(_code.HttpStatus.OK).json({
          data: orders,
          total,
          totalPage: Math.ceil(total / 10),
          page: Number(page)
        });
      }

      return res.status(_code.HttpStatus.OK).json({
        data: []
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async create(req, res, next) {
    try {
      const {
        user,
        product,
        model,
        amount
      } = req.body;
      const cartOfUser = await _order.OrderModel.findOne({
        user,
        model
      });

      if (cartOfUser) {
        await cartOfUser.update({
          amount: cartOfUser.amount + amount
        }, {
          upsert: true
        });
        return res.status(_code.HttpStatus.OK).json({
          is_success: true
        });
      }

      const orderResponse = new _order.OrderModel({
        user,
        product,
        model,
        amount: Number(amount)
      });
      await orderResponse.save();
      return res.status(_code.HttpStatus.OK).json({
        is_success: true
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async purchase(req, res, next) {
    try {
      const {
        data
      } = req.body;
      const cardIds = data.map(item => item.cart_id).filter(item => item);
      await _order.OrderModel.deleteMany({
        _id: cardIds
      });

      _order.OrderModel.insertMany(data.map(item => ({ ...item,
        status: _order.OrderStatusEnums.ORDERING
      }))).then(() => {
        return res.status(_code.HttpStatus.OK).json({
          is_success: true
        });
      }).catch(err => {
        return (0, _error.throwError)(next, err?.status, err?.message);
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async getStatus(req, res, next) {
    try {
      const {
        user_id
      } = req.params;
      const orders = await _order.OrderModel.find({
        user: user_id
      });
      const status = {
        ORDERED: 0,
        ORDERING: 0,
        PICKING: 0
      };
      orders.map(order => {
        status[order.status] += 1;
      });
      return res.status(_code.HttpStatus.OK).json({
        status
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const {
        user_id
      } = req.params;
      const {
        status,
        order_id
      } = req.body;
      const data = await _order.OrderModel.findOneAndUpdate({
        user: user_id,
        _id: order_id
      }, {
        $set: {
          status
        }
      }, {
        upsert: true,
        new: true
      });
      return res.status(_code.HttpStatus.OK).json({
        data: data
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

}

exports.OrderController = OrderController;