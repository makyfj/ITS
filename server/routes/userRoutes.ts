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
router.get("/:id", authMiddleware, adminMiddleware, getUser);
router.put("/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export { router as userRoutes };
