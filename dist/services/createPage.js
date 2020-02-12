"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUrlPage = _interopRequireDefault(require("./getUrlPage"));

var _loadPageTranslationAxios = _interopRequireDefault(require("./loadPageTranslationAxios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Create the page = img and translation
var createPage =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(recipient) {
    var pageObjectToRender;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageObjectToRender = {
              srcUrl: "",
              verses: []
            };
            _context.next = 3;
            return (0, _getUrlPage["default"])(recipient).then(function (srcUrl) {
              pageObjectToRender.srcUrl = srcUrl;
            })["catch"](function (err) {
              console.error(err);
            });

          case 3:
            _context.next = 5;
            return (0, _loadPageTranslationAxios["default"])(recipient).then(function (verses) {
              pageObjectToRender.verses = verses;
            })["catch"](function (error) {
              console.error(error);
            });

          case 5:
            return _context.abrupt("return", pageObjectToRender);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createPage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createPage;
exports["default"] = _default;