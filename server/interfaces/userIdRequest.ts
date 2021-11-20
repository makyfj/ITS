import { Request } from "express";

export interface UserIdRequest extends Request {
  user: {
    _id: string;
  };
}
