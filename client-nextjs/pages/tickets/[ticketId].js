import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../../app/features/ticket/ticketSlice";

const TicketId = () => {
  const dispatch = useDispatch();
  const { ticketInfo } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getTicket(ticketInfo._id));
  }, [dispatch, ticketInfo._id]);

  return (
    <>
      <h1>Ticket Info</h1>
      <div className="ticket">
        <form>
          <label>ID: {ticketInfo._id}</label>
          <label>
            Category: <input type="text" placeholder={ticketInfo.category} />
          </label>
          <label>
            Description:
            <textarea
              type="text"
              rows="4"
              placeholder={ticketInfo.description}
            />
          </label>
          <label>
            Date Created:
            <input type="text" placeholder={ticketInfo.dateCreated} />
          </label>
          <label>
            Date Resolved:{" "}
            <input type="text" placeholder={ticketInfo.dateResolved} />
          </label>
          <label>
            State:
            <input
              type="text"
              placeholder={ticketInfo.state ? "True" : "False"}
            />
          </label>
          <label>
            Tags: <input type="text" placeholder={ticketInfo.tags} />
          </label>
          <label>User: {ticketInfo.user}</label>
          <label>
            Current Assignee:{" "}
            <input type="text" placeholder={ticketInfo.currentAssignee} />
          </label>
          <button>Update Ticket</button>
          <button>Delete Ticket</button>
        </form>
      </div>
    </>
  );
};

export default TicketId;
