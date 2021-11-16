import { Schema, model, Document } from "mongoose";
import { User } from "./userModel";

interface Ticket extends Document {
  category: string;
  state: string;
  dateCreated: Date;
  dateResolved: Date;
  contact: string;
  tags: Array<string>;
  currentAssignee: User;
  caseHistory: Array<string>;
}

const ticketSchema = new Schema<Ticket>({
  category: { type: String, required: true },
  state: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  dateResolved: { type: Date, required: true },
  contact: { type: String, required: true },
  tags: { type: [String], required: true },
  currentAssignee: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  caseHistory: { type: [String], required: true },
});

// Create the ticket model
const TicketModel = model<Ticket>("Ticket", ticketSchema);

export default TicketModel;
