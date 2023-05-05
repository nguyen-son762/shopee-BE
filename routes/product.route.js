"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRoutes = void 0;

var _product = require("./../controllers/product.controller");

var _route = require("../constants/route.constant");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRoutes = _express.default.Router();

exports.productRoutes = productRoutes;
productRoutes.get(_route.productEndpoints.GET_BY_ID, _product.ProductController.getProductById);
productRoutes.get(_route.productEndpoints.GET, _product.ProductController.getProducts);
productRoutes.get(_route.productEndpoints.RECOMMEND, _product.ProductController.getRecommendedProducts);
productRoutes.post(_route.productEndpoints.CREATE, _product.ProductController.createProducts);