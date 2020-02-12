"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// API Call to get the translation of the page related to pageNumber and translationType
var loadPageTranslationAxios =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(recipient) {
    var translationType, response, ayahsArr, ayah, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ayahIndex;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            translationType = "en.hilali";
            _context.prev = 1;
            _context.next = 4;
            return _axios["default"].get("http://api.alquran.cloud/v1/page/".concat(recipient.advancement, "/").concat(translationType));

          case 4:
            response = _context.sent;
            ayahsArr = response.data.data.ayahs;
            ayah = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;

            for (_iterator = ayahsArr[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              ayahIndex = _step.value;
              ayah.push({
                number: ayahIndex.numberInSurah,
                text: ayahIndex.text
              });
            }

            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
            return _context.abrupt("return", ayah);

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](1);
            console.error("loadPageTranslationAxios error : ".concat(_context.t1.message));

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 29], [10, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function loadPageTranslationAxios(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = loadPageTranslationAxios;
exports["default"] = _default;