import express from "express";

import {
  createTicket,
  deleteTicket,
  getTicket,
  updateTicket,
  getUserTickets,
  getAllTickets,
} from "../controllers/ticketController";
import { admin, auth } from "../middleware/authMiddleware";

const router = express.Router();

// Only admin and authorized user is able to access ticketRoutes
router.route("/").get(auth, admin, getAllTickets);

router.post("/ticket", auth, createTicket);
router
  .route("/:id")
  .get(auth, getTicket)
  .put(auth, updateTicket)
  .delete(auth, deleteTicket);

router.get("/user/:id", auth, getUserTickets);

export { router as ticketRoutes };
