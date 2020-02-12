"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

var _express = _interopRequireWildcard(require("express"));

var _mongooseConnection = _interopRequireDefault(require("./services/mongooseConnection"));

var _getRecipients = _interopRequireDefault(require("./services/getRecipients"));

var _createPage = _interopRequireDefault(require("./services/createPage"));

var _sendMail = _interopRequireDefault(require("./services/sendMail"));

var _incrementAdvancement = _interopRequireDefault(require("./services/incrementAdvancement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var app = (0, _express["default"])();
app.listen(process.env.PORT, function () {
  return console.log("1pageQuran app listening on port ".concat(process.env.PORT, "!"));
});
app.use((0, _express.json)()); // Mongodb connection

(0, _mongooseConnection["default"])();

var main =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var recipients;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _getRecipients["default"])();

          case 2:
            recipients = _context2.sent;
            // Iterate through recipients array
            recipients.map(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(recipient) {
                var pageObjectToRender, options;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // Set the page
                        pageObjectToRender = {
                          srcUrl: "",
                          verses: []
                        }; // Set the options of the email

                        options = {
                          method: "POST",
                          url: "https://api.sendgrid.com/v3/mail/send",
                          headers: {
                            "content-type": "application/json",
                            authorization: "Bearer ".concat(process.env.SENDGRID_API_KEY)
                          },
                          body: {
                            personalizations: [{
                              to: [{
                                email: recipient.email
                              }],
                              dynamic_template_data: {
                                pageObjectToRender: pageObjectToRender
                              },
                              subject: "Read the page ".concat(recipient.advancement, " today !")
                            }],
                            from: {
                              email: "pageoftheday@1pageofquran.com",
                              name: "Merwan"
                            },
                            reply_to: {
                              email: "pageoftheday@1pageofquran.com",
                              name: "Merwan"
                            },
                            template_id: "".concat(process.env.Template_ID)
                          },
                          asm: {
                            group_id: 12519
                          },
                          json: true
                        };
                        _context.next = 4;
                        return (0, _createPage["default"])(recipient).then(function (res) {
                          options.body.personalizations[0].dynamic_template_data.pageObjectToRender = res; //   console.log(
                          //     `recipient.email : ${recipient.email}`,
                          //     `dynamic_template_data : ${JSON.stringify(
                          //       options.body.personalizations[0].dynamic_template_data
                          //         .pageObjectToRender
                          //     )}`
                          //   );
                        })["catch"](function (error) {
                          console.error(error);
                        });

                      case 4:
                        _context.prev = 4;
                        (0, _sendMail["default"])(options);
                        _context.next = 11;
                        break;

                      case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](4);
                        console.error(_context.t0);

                      case 11:
                        _context.prev = 11;
                        _context.next = 14;
                        return (0, _incrementAdvancement["default"])(recipient);

                      case 14:
                        return _context.finish(11);

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[4, 8, 11, 15]]);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main();
var _default = app;
exports["default"] = _default;