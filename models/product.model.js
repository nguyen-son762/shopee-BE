"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductModel = void 0;

var _mongoose = require("mongoose");

const productSchema = new _mongoose.Schema({
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: ""
  },
  name: {
    type: String,
    default: "",
    index: true
  },
  price: {
    type: Number,
    default: 0
  },
  thumb_url: {
    type: String,
    default: "https://alxgroup.com.au/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"
  },
  description: {
    type: String,
    default: ""
  },
  images: [{
    type: String
  }],
  models: [{
    _id: {
      type: _mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true
    },
    name: {
      type: String,
      index: true,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    },
    promotion: {
      type: Number,
      default: 0
    },
    images: {
      type: String,
      default: ""
    }
  }],
  price_before_discount: {
    type: Number,
    default: 0
  },
  price_max: {
    type: Number,
    default: 0
  },
  price_max_before_discount: {
    type: Number,
    default: 0
  },
  price_min: {
    type: Number,
    default: 0
  },
  price_min_before_discount: {
    type: Number,
    default: 0
  },
  raw_discount: {
    type: Number,
    default: 0
  },
  tier_variations: [{
    name: {
      type: String,
      default: ""
    },
    options: [{
      type: String
    }],
    images: [{
      type: String
    }]
  }],
  item_rating: {
    rating_count: [{
      type: Number
    }],
    rating_star: {
      type: Number
    }
  } // video_info_list: [
  //   {
  //     _id: Schema.Types.ObjectId,
  //     thumb_url: {
  //       type: String,
  //     },
  //   },
  // ],

});
productSchema.index({
  name: "text"
});
const ProductModel = (0, _mongoose.model)("Product", productSchema);
exports.ProductModel = ProductModel;