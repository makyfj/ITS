import express from "express";

import {
  createTicket,
  deleteTicket,
  getTicket,
  updateTicket,
  getUserTickets,
  getAllTickets,
} from "../controllers/ticketController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Only admin and authorized user is able to access ticketRoutes

router.get("/", adminMiddleware, getAllTickets);
router.post("/ticket", authMiddleware, createTicket);
router
  .route("/:id")
  .get(authMiddleware, getTicket)
  .put(authMiddleware, updateTicket)
  .delete(authMiddleware, deleteTicket);

router.get("/user/:id", authMiddleware, getUserTickets);

export { router as ticketRoutes };
