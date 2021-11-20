import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserRequest } from "../interfaces/userRequest";

import TicketModel from "../models/ticketModel";

// @desc Create a new Ticket
// @route POST /api/tickets/ticket
// @access Private
const createTicket = asyncHandler(async (req: UserRequest, res: Response) => {
  const { category, description, state, tags, currentAssignee } = req.body;

  const ticket = new TicketModel({
    category,
    description,
    state,
    tags,
    user: req.user._id,
    currentAssignee,
  });

  const createTicket = await ticket.save({});

  res.status(201).json(createTicket);
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
