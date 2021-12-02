"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ticketSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    dateResolved: { type: Date },
    state: { type: Boolean, required: true, "default": false },
    tags: { type: [String], required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    currentAssignee: { type: String, required: true },
    caseHistory: {
        type: [
            {
                category: { type: String },
                description: { type: String },
                dateCreated: { type: Date },
                dateResolved: { type: Date },
                state: { type: Boolean, "default": false },
                tags: { type: [String] },
                currentAssignee: { type: String }
            },
        ]
    }
}, {
    // This provides createdAt and updatedAt
    timestamps: true
});
// Create the ticket model
var TicketModel = mongoose_1.model("Ticket", ticketSchema);
exports["default"] = TicketModel;
