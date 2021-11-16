import { Request } from "express";
import { User } from "../models/userModel";

export interface UserRequest extends Request {
  user: User;
}
