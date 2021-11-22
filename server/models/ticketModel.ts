import { Schema, model, Document } from "mongoose";
import { User } from "./userModel";

interface Ticket extends Document {
  category: string;
  description: string;
  dateCreated: { type: Date; required: true };
  dateResolved: { type: Date; required: true };
  // If true - then ticket is resolved else not resolved
  state: boolean;
  tags: Array<string>;
  user: User;
  currentAssignee: string;
  caseHistory: Array<string>;
}

const ticketSchema = new Schema<Ticket>(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    dateResolved: { type: Date },
    state: { type: Boolean, required: true, default: false },
    tags: { type: [String], required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    currentAssignee: { type: String, required: true },
    caseHistory: {
      type: [
        {
          category: { type: String, required: true },
          description: { type: String, required: true },
          dateCreated: { type: Date, required: true },
          dateResolved: { type: Date },
          state: { type: Boolean, required: true, default: false },
          tags: { type: [String], required: true },
          currentAssignee: { type: String, required: true },
        },
      ],
    },
  },
  {
    // This provides createdAt and updatedAt
    timestamps: true,
  }
);

// Create the ticket model
const TicketModel = model<Ticket>("Ticket", ticketSchema);

export default TicketModel;
