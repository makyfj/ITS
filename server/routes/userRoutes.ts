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
router.get("/all", getUsers, authMiddleware, adminMiddleware);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser, authMiddleware);
router.put("/:id", updateUser, authMiddleware);
router.delete("/:id", deleteUser, authMiddleware);

export { router as userRoutes };
