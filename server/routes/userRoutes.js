"use strict";
exports.__esModule = true;
exports.userRoutes = void 0;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1["default"].Router();
exports.userRoutes = router;
// Only admin has access to this route -> /all
router.get("/all", authMiddleware_1.auth, authMiddleware_1.admin, userController_1.getUsers);
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router
    .route("/:id")
    .get(authMiddleware_1.auth, userController_1.getUser)
    .put(authMiddleware_1.auth, userController_1.updateUser)["delete"](authMiddleware_1.auth, userController_1.deleteUser);
