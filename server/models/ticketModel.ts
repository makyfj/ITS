import { Schema, model, Document} from "mongoose";
import {UserModel} from "userModel";

interface Ticket extends Document{
	id: number;
	category: string;
	
	state: string;

	dateCreated: Date;
	dateResolved: Date;
		
	contact: string;
	tags: Array<string>

	currentAssignee: User
	caseHistory: Array<string>
}


const ticketSchema = new Schema<Ticket> extends User(
	{
	id: { type: Number, required: true},
	category: { type: String, required: true},
	state: { type: String, required: true},
	
	dateCreated: { type: Date, required: true},
	dateResolved: { type: Date, required: false},
	
	contact: { type: String, required: true},
	tags: { type: Array, required: true},

	currentAssignee: { type: User, required: true}, 
	caseHistory: { type: Array, required: false},

	}

);








