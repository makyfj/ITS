"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    category: { type: [String], required: true }
});
var CategoryModel = mongoose_1.model("Category", categorySchema);
exports["default"] = CategoryModel;
