import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import CategoryModel from "../models/categoryModel";

// @desc Get categories
// @route GET /api/category
// @access Public
const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await CategoryModel.find({});

  if (categories) {
    res.json(categories);
  } else {
    res.status(401).send("Categories not found");
  }
});

// @desc Create a category
// @route POST /api/category
// @access Admin
const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.body;

  const newCategory = new CategoryModel({
    category,
  });

  await newCategory.save({});

  res.status(201).json(newCategory);
});

// @desc Update categories
// @route PUT /api/category/:id
// @access Admin
const updateCategories = asyncHandler(async (req: Request, res: Response) => {
  const updatedTicket = await CategoryModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { category: req.body.category } }
  );

  if (updatedTicket) {
    res.json(updatedTicket);
  } else {
    res.status(401).send("Ticket not found");
  }
});

export { getCategories, createCategory, updateCategories };
