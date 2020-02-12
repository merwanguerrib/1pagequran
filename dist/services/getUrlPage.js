"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Page = _interopRequireDefault(require("../models/Page"));

var _getRecipients = _interopRequireDefault(require("./getRecipients"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Search in database for the url related to pageNumber
var getUrlPage =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(recipient) {
    var imgSrc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            imgSrc = "";
            _context.prev = 1;
            _context.next = 4;
            return _Page["default"].findOne({
              number: recipient.advancement
            }).then(function (dbRes) {
              imgSrc = dbRes.image;
            });

          case 4:
            return _context.abrupt("return", imgSrc);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            console.error("Dbres error : ", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function getUrlPage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getUrlPage;
exports["default"] = _default;