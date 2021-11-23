import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { UserIdRequest } from "../interfaces/userIdRequest";
import { UserRequest } from "../interfaces/userRequest";
import TicketModel from "../models/ticketModel";
import UserModel from "../models/userModel";

// @desc Create a new Ticket
// @route POST /api/tickets/ticket
// @access Private
const createTicket = asyncHandler(async (req: Request, res: Response) => {
  const { category, description, state, tags, currentAssignee } = req.body;

  const token = req.headers.authorization.split(" ")[1];
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
  const { userId } = decoded;
  const user = await UserModel.findById(userId);

  const caseHistory = {
    category,
    description,
    state,
    dateCreated: new Date(),
    tags,
    currentAssignee,
  };

  const ticket = new TicketModel({
    category,
    description,
    dateCreated: new Date(),
    state,
    tags,
    user: user._id,
    currentAssignee,
    caseHistory: caseHistory,
  });

  const createTicket = await ticket.save({});

  res.status(201).json(createTicket);
});

// @desc Get a ticket by id
// @route GET /api/tickets/:id
// @access Private/Admin
const getTicket = asyncHandler(async (req: Request, res: Response) => {
  const ticket = await TicketModel.findById(req.params.id);

  if (ticket) {
    res.json({
      _id: ticket._id,
      category: ticket.category,
      description: ticket.description,
      dateCreated: ticket.dateCreated,
      dateResolved: ticket.dateResolved,
      state: ticket.state,
      tags: ticket.tags,
      user: ticket.user,
      currentAssignee: ticket.currentAssignee,
      caseHistory: ticket.caseHistory,
    });
  } else {
    res.status(404).send("Ticket not found");
  }
});

// @desc Update a ticket by id
// @route PUT /api/tickets/:id
// @access Private/Admin
const updateTicket = asyncHandler(async (req: Request, res: Response) => {
  const ticket = await TicketModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (ticket) {
    res.json({
      _id: ticket._id,
      category: ticket.category,
      description: ticket.description,
      dateCreated: ticket.dateCreated,
      dateResolved: ticket.dateResolved,
      state: ticket.state,
      tags: ticket.tags,
      user: ticket.user,
      currentAssignee: ticket.currentAssignee,
      caseHistory: ticket.caseHistory,
    });
  } else {
    res.status(404).send("Ticket not found");
  }
});

// @desc Delete a ticket by id
// @route DELETE /api/tickets/:id
// @access Private/Admin
const deleteTicket = asyncHandler(async (req: Request, res: Response) => {
  const ticket = await TicketModel.findByIdAndDelete(req.params.id);

  if (ticket) {
    res.status(200).send("Ticket Deleted");
  } else {
    res.status(404).send("Ticket not found");
  }
});

// @desc Get all tickets of a single user
// @route GET /api/tickets/user/:id
// @access Private/Admin
const getUserTickets = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  const tickets = await TicketModel.find({ user: user._id });

  if (tickets) {
    res.status(200).json(tickets);
  } else {
    res.status(404).send("Tickets not found");
  }
});

// @desc Get all tickets
// @route GET /api/tickets
// @access Private/Admin
const getAllTickets = asyncHandler(async (req: Request, res: Response) => {
  const tickets = await TicketModel.find({});

  if (tickets) {
    res.status(200).json(tickets);
  } else {
    res.status(404).send("Tickets not found");
  }
});

export {
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  getUserTickets,
};
