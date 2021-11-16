import { Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { UserRequest } from "../interfaces/userRequest";

const authMiddleware = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await UserModel.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401).send("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401).send("Not authorized, no token provided");
    }
  }
);

const admin = (req: UserRequest, res: Response, next: NextFunction) => {
  // If the user is an admin, continue with the request to the restricted route
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized, not an admin");
  }
};

export { authMiddleware, admin };
