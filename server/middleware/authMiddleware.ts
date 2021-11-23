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

        req.user = await UserModel.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.log(error);
        res.status(401).json("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401).json("Not authorized, no token provided");
    }
  }
);

const adminMiddleware = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.userId).select(
          "-password"
        );

        // If the user is an admin, continue with the request to the restricted route
        if (user && user.isAdmin) {
          next();
        } else {
          res.status(401).json("Not authorized, not an admin");
        }
      } catch (error) {
        console.log(error);
        res.status(401).json("Not authorized, not an admin");
      }
    }

    if (!token) {
      res.status(401).json("Not authorized, no token provided");
    }
  }
);

export { authMiddleware, adminMiddleware };
