"use strict";

var _express = _interopRequireDefault(require("express"));

var _router = require("./routes/router.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 4000;
app.use(_router.router);
app.listen(port, function () {
  console.log("listening to the port at ".concat(port));
});