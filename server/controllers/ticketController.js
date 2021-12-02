"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUserTickets = exports.getAllTickets = exports.deleteTicket = exports.updateTicket = exports.getTicket = exports.createTicket = void 0;
var express_async_handler_1 = require("express-async-handler");
var jsonwebtoken_1 = require("jsonwebtoken");
var ticketModel_1 = require("../models/ticketModel");
var userModel_1 = require("../models/userModel");
// @desc Create a new Ticket
// @route POST /api/tickets/ticket
// @access Private
var createTicket = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, description, tags, currentAssignee, token, decoded, userId, user, caseHistory, ticket, createTicket;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, category = _a.category, description = _a.description, tags = _a.tags, currentAssignee = _a.currentAssignee;
                token = req.headers.authorization.split(" ")[1];
                decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
                return [4 /*yield*/, userModel_1["default"].findById(userId)];
            case 1:
                user = _b.sent();
                caseHistory = {
                    category: category,
                    description: description,
                    dateCreated: new Date(),
                    tags: tags,
                    currentAssignee: currentAssignee
                };
                ticket = new ticketModel_1["default"]({
                    category: category,
                    description: description,
                    dateCreated: new Date(),
                    tags: tags,
                    user: user._id,
                    currentAssignee: currentAssignee,
                    caseHistory: caseHistory
                });
                return [4 /*yield*/, ticket.save({})];
            case 2:
                createTicket = _b.sent();
                res.status(201).json(createTicket);
                return [2 /*return*/];
        }
    });
}); });
exports.createTicket = createTicket;
// @desc Get a ticket by id
// @route GET /api/tickets/:id
// @access Private/Admin
var getTicket = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ticketModel_1["default"].findById(req.params.id)];
            case 1:
                ticket = _a.sent();
                if (ticket) {
                    res.json({
                        _id: ticket._id,
                        category: ticket.category,
                        description: ticket.description,
                        dateCreated: ticket.dateCreated,
                        dateResolved: ticket.dateResolved,
                        state: ticket.state,
                        tags: ticket.tags,
                        user: ticket.user,
                        currentAssignee: ticket.currentAssignee,
                        caseHistory: ticket.caseHistory
                    });
                }
                else {
                    res.status(404).send("Ticket not found");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getTicket = getTicket;
// @desc Update a ticket by id
// @route PUT /api/tickets/:id
// @access Private/Admin
var updateTicket = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var state, ticket, ticketCaseHistory, updatedTicket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                state = req.body.state;
                if (state === true) {
                    req.body.dateResolved = new Date();
                }
                return [4 /*yield*/, ticketModel_1["default"].findById(req.params.id)];
            case 1:
                ticket = _a.sent();
                return [4 /*yield*/, ticketModel_1["default"].findOneAndUpdate({ _id: req.params.id }, { $push: { caseHistory: req.body }, "new": true })];
            case 2:
                ticketCaseHistory = _a.sent();
                if (!ticket) return [3 /*break*/, 4];
                ticket.category = req.body.category || ticket.category;
                ticket.description = req.body.description || ticket.description;
                ticket.dateCreated = req.body.dateCreated || ticket.dateCreated;
                ticket.dateResolved = req.body.dateResolved || ticket.dateResolved;
                ticket.state = req.body.state || ticket.state;
                ticket.tags = req.body.tags || ticket.tags;
                ticket.user = req.body.user || ticket.user;
                ticket.currentAssignee = req.body.currentAssignee || ticket.currentAssignee;
                ticket.caseHistory = ticketCaseHistory.caseHistory;
                return [4 /*yield*/, ticket.save()];
            case 3:
                updatedTicket = _a.sent();
                res.json({
                    _id: updatedTicket._id,
                    category: updatedTicket.category,
                    description: updatedTicket.description,
                    dateCreated: updatedTicket.dateCreated,
                    dateResolved: updatedTicket.dateResolved,
                    state: updatedTicket.state,
                    tags: updatedTicket.tags,
                    user: updatedTicket.user,
                    currentAssignee: updatedTicket.currentAssignee,
                    caseHistory: updatedTicket.caseHistory
                });
                return [3 /*break*/, 5];
            case 4:
                res.status(404).send("Ticket not found");
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.updateTicket = updateTicket;
// @desc Delete a ticket by id
// @route DELETE /api/tickets/:id
// @access Private/Admin
var deleteTicket = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ticketModel_1["default"].findByIdAndDelete(req.params.id)];
            case 1:
                ticket = _a.sent();
                if (ticket) {
                    res.status(200).send("Ticket Deleted");
                }
                else {
                    res.status(404).send("Ticket not found");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.deleteTicket = deleteTicket;
// @desc Get all tickets of a single user
// @route GET /api/tickets/user/:id
// @access Private/Admin
var getUserTickets = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tickets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModel_1["default"].findById(req.params.id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, ticketModel_1["default"].find({ user: user._id })];
            case 2:
                tickets = _a.sent();
                if (tickets) {
                    res.status(200).json(tickets);
                }
                else {
                    res.status(404).send("Tickets not found");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getUserTickets = getUserTickets;
// @desc Get all tickets
// @route GET /api/tickets
// @access Private/Admin
var getAllTickets = express_async_handler_1["default"](function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ticketModel_1["default"].find({})];
            case 1:
                tickets = _a.sent();
                if (tickets) {
                    res.status(200).json(tickets);
                }
                else {
                    res.status(404).send("Tickets not found");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getAllTickets = getAllTickets;
