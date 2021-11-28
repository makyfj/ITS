import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Only admin has access to this route -> /all
router.get("/all", auth, admin, getUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/:id")
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

export { router as userRoutes };
