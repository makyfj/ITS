import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { UserIdRequest } from "../interfaces/userIdRequest";
import { UserRequest } from "../interfaces/userRequest";
import TicketModel from "../models/ticketModel";
import UserModel from "../models/userModel";

// @desc Create a new Ticket
// @route POST /api/tickets/ticket
// @access Private
const createTicket = asyncHandler(async (req: Request, res: Response) => {
  // const { category, description, state, tags, currentAssignee } = req.body;
  console.log(req.headers.authorization.startsWith("Bearer"));
  const token = req.headers.authorization.split(" ")[1];
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
  const { userId } = decoded;
  const user = await UserModel.findById(userId);
  res.status(200).json(user);
  // const ticket = new TicketModel({
  //   category,
  //   description,
  //   state,
  //   tags,
  //   user: req.user._id,
  //   currentAssignee,
  // });

  // const createTicket = await ticket.save({});

  // res.status(201).json(createTicket);
});

// @desc Get a ticket by id
// @route GET /api/tickets/:id
// @access Private/Admin
const getTicket = asyncHandler(async (req: Request, res: Response) => {});

// @desc Update a ticket by id
// @route PUT /api/tickets/:id
// @access Private/Admin
const updateTicket = asyncHandler(async (req: Request, res: Response) => {});

// @desc Delete a ticket by id
// @route DELETE /api/tickets/:id
// @access Private/Admin
const deleteTicket = asyncHandler(async (req: Request, res: Response) => {});

// @desc Get all tickets of a single user
// @route GET /api/tickets/user
// @access Private/Admin
const getUserTickets = asyncHandler(async (req: Request, res: Response) => {});

// @desc Get all tickets
// @route GET /api/tickets
// @access Private/Admin
const getAllTickets = asyncHandler(async (req: Request, res: Response) => {});

export { createTicket };
