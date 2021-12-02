import express from "express";

import {
  getCategories,
  createCategory,
  updateCategories,
} from "../controllers/categoryController";
import { admin, auth } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(auth, getCategories).post(auth, admin, createCategory);

router.put("/:id", updateCategories, auth, admin);

export { router as categoryRoutes };
