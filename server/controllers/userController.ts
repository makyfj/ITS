import { Request, Response } from "express";
import UserModel from "../models/userModel";
import User from "../interfaces/userInterface";
import asyncHandler from "express-async-handler";
import * as bcrypt from "bcrypt";

// @desc Register a new user
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // If user is already registered
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password);

  const newUser = await UserModel.create({ name, email, hashedPassword });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

export { registerUser };
