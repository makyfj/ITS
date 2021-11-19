import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import TicketModel from "../models/ticketModel";

// @desc Create a new Ticket
// @route POST /api/tickets/ticket
// @access Private
const createTicket = asyncHandler(async (req: Request, res: Response) => {});

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
