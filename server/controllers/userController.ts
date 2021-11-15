import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UserModel from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // If user is already registered
  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  const newUser = await UserModel.create({ name, email, password });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      // Sends a token with user data
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).send("Incorrect information");
  }
});

// @desc Login a registered user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // Sends a token with user data
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
});

export { registerUser, loginUser };
