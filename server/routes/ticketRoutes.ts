import express from "express";

import { createTicket } from "../controllers/ticketController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Only admin and authorized user is able to access ticketRoutes

router.post("/ticket", createTicket, authMiddleware);

export { router as ticketRoutes };
