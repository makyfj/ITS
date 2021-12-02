"use strict";
exports.__esModule = true;
exports.ticketRoutes = void 0;
var express_1 = require("express");
var ticketController_1 = require("../controllers/ticketController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1["default"].Router();
exports.ticketRoutes = router;
// Only admin and authorized user is able to access ticketRoutes
router.route("/").get(authMiddleware_1.auth, authMiddleware_1.admin, ticketController_1.getAllTickets);
router.post("/ticket", authMiddleware_1.auth, ticketController_1.createTicket);
router
    .route("/:id")
    .get(authMiddleware_1.auth, ticketController_1.getTicket)
    .put(authMiddleware_1.auth, ticketController_1.updateTicket)["delete"](authMiddleware_1.auth, ticketController_1.deleteTicket);
router.get("/user/:id", authMiddleware_1.auth, ticketController_1.getUserTickets);
