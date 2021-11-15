import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import connectDB from "./database/db";
import { userRoutes } from "./routes/userRoutes";

// environment variables
dotenv.config();

// Db connection
connectDB();

const app = express();

// body parse - middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Web-Base Issue Tracking System API is running");
});

// User routes
app.use("/api/users", userRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
