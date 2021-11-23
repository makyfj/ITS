import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Only admin has access to this route -> /all
router.get("/all", adminMiddleware, getUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/:id")
  .get(authMiddleware, getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

export { router as userRoutes };
