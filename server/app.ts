import express, { Request, Response, NextFunction } from "express";

const app = express();

// body parse - middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Web-Base Issue Tracking System API is running");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
