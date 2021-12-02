"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var generateToken = function (userId) {
    return jsonwebtoken_1["default"].sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};
exports["default"] = generateToken;
