import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/db";
import { userRoutes } from "./routes/userRoutes";
import { ticketRoutes } from "./routes/ticketRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";

// environment variables
dotenv.config();

// Db connection
connectDB();

const app = express();

// body parse - middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Web-Based Issue Tracking System API is running :)");
});

// User routes
app.use("/api/users", userRoutes);

// Ticket routes
app.use("/api/tickets", ticketRoutes);

// Category routes
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
