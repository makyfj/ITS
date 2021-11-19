import { Schema, model, Document } from "mongoose";
import { User } from "./userModel";

interface Ticket extends Document {
  category: string;
  title: string;
  description: string;
  isResolved: boolean;
  tags: Array<string>;
  user: User;
  caseHistory: Array<string>;
}

const ticketSchema = new Schema<Ticket>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isResolved: { type: Boolean, required: true },
    tags: { type: [String], required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    caseHistory: { type: [String], required: true },
  },
  {
    // This provides createdAt and updatedAt
    timestamps: true,
  }
);

// Create the ticket model
const TicketModel = model<Ticket>("Ticket", ticketSchema);

export default TicketModel;
