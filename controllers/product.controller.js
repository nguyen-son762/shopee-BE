"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductController = void 0;

var _code = require("../constants/code.constant");

var _category = require("../models/category.model");

var _product = require("../models/product.model");

var _error = require("../utils/error");

class ProductController {
  static async getProducts(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        keyword = "",
        category,
        sort = ""
      } = req.query;
      let querySearch = {};

      if (keyword) {
        querySearch = { ...querySearch,
          name: new RegExp(keyword.toLowerCase())
        };
      }

      if (category) {
        querySearch = { ...querySearch,
          category
        };
      }

      let products;

      if (sort) {
        products = await _product.ProductModel.find(querySearch).populate({
          path: "category",
          model: _category.CategoryModel
        }).sort({
          price: sort === "asc" ? 1 : -1
        }).skip((page - 1) * limit).limit(limit);
      } else {
        products = await _product.ProductModel.find(querySearch).populate({
          path: "category",
          model: _category.CategoryModel
        }).skip((page - 1) * limit).limit(limit);
      }

      const total = await _product.ProductModel.countDocuments(querySearch);
      return res.status(_code.HttpStatus.OK).json({
        data: products,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(total / limit),
        total: total
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async createProducts(req, res, next) {
    const {
      products
    } = req.body;

    _product.ProductModel.insertMany(products).then(data => {
      res.status(_code.HttpStatus.OK).json(data);
    }).catch(err => {
      return (0, _error.throwError)(next, err?.status, err?.message);
    });
  }

  static async getRecommendedProducts(req, res, next) {
    try {
      const products = await _product.ProductModel.find({
        name: {
          $regex: `${req.query.name}`,
          $options: "i"
        }
      });
      return res.json({
        data: products
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const {
        product_id
      } = req.params;
      const product = await _product.ProductModel.findOne({
        _id: product_id
      });
      return res.status(_code.HttpStatus.OK).json({
        data: product
      });
    } catch (err) {
      return (0, _error.throwError)(next, err?.status, err?.message);
    }
  }

}

exports.ProductController = ProductController;