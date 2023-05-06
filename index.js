"use strict";

var dotenv = _interopRequireWildcard(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _compression = _interopRequireDefault(require("compression"));

var _db = require("./config/db");

var _error = _interopRequireDefault(require("./middleware/error.middleware"));

var routes = _interopRequireWildcard(require("./routes"));

var _route = require("./constants/route.constant");

var _redis = require("./config/redis");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();
const app = (0, _express.default)();
const port = process.env.PORT || 5000;
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)());
app.use(_express.default.json({
  limit: "100mb"
}));
app.use(_express.default.urlencoded({
  limit: "100mb",
  extended: true
}));
app.use((0, _compression.default)({
  level: 6,
  threshold: 100 * 1000
})); // connect database

(0, _db.connectDB)();

_redis.client.on("error", err => console.log("Redis Client Error", err)); // client
//   .connect()
//   .then(() => {
//     console.log("redis success");
//   })
//   .catch(err => {
//     console.log("err redis", err);
//   });


_cloudinary.default.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

app.use("/api-docs", _swaggerUiExpress.default.serve);
app.get("/api-docs", _swaggerUiExpress.default.setup(_swagger.default)); // routes

app.use(_route.authEndpoints.AUTH, routes.userRoutes);
app.use(_route.productEndpoints.PRODUCT, routes.productRoutes);
app.use(_route.orderEndpoints.ORDER, routes.orderRoutes);
app.use(_error.default);
app.listen(port, () => {
  console.log("app is listening in port", port);
});