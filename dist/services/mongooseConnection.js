"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();

// Mongodb connection
var mongooseConnection = function mongooseConnection() {
  _mongoose["default"].connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }).then(function (x) {
    console.log("Connected to Mongo ! Database name : ".concat(x.connections[0].name));
  })["catch"](function (err) {
    console.error("Error connecting to Mongo ".concat(err));
  });
};

var _default = mongooseConnection;
exports["default"] = _default;