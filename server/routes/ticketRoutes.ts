import express from "express";

import { createTicket, getTicket } from "../controllers/ticketController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Only admin and authorized user is able to access ticketRoutes

router.post("/ticket", authMiddleware, createTicket);
router.get("/:id", authMiddleware, getTicket);

export { router as ticketRoutes };
