import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getTicket,
  updateTicket,
  deleteTicket,
  clearTicketStatus,
  clearTicketInfo,
} from "../../app/features/ticket/ticketSlice";

const TicketId = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [ticketTags, setTicketTags] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { ticketInfo } = useSelector((state) => state.ticket);
  const { isSuccess } = useSelector((state) => state.ticket.ticketStatus);

  const { _id } = ticketInfo;

  const updateTicketHandler = (e) => {
    e.preventDefault();
    const tags = ticketTags.split(",");
    dispatch(
      updateTicket({ _id, category, description, tags, state, currentAssignee })
    );
  };

  const deleteTicketHandler = (e) => {
    e.preventDefault();
    dispatch(deleteTicket(_id));
    if (isSuccess) {
      dispatch(clearTicketInfo());
      dispatch(clearTicketStatus());
      router.push("/");
    }
  };

  useEffect(() => {
    dispatch(getTicket(ticketInfo._id));

    if (ticketInfo._id === "") {
      router.push("/");
    }
  }, [dispatch, ticketInfo._id, router]);

  return (
    <>
      <h1>Ticket Info</h1>
      <div className="ticket">
        <form>
          <label>ID: {ticketInfo._id}</label>
          <label>
            Category:{" "}
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={ticketInfo.category}
            />
          </label>
          <label>
            Description:
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            Tags:{" "}
            <input
              type="text"
              value={ticketTags}
              onChange={(e) => setTicketTags(e.target.value)}
              placeholder={ticketInfo.tags}
            />
          </label>
          <label>User: {ticketInfo.user}</label>
          <label>
            Current Assignee:{" "}
            <input
              type="text"
              value={currentAssignee}
              onChange={(e) => setCurrentAssignee(e.target.value)}
              placeholder={ticketInfo.currentAssignee}
            />
          </label>
          <button type="submit" onClick={updateTicketHandler}>
            Update Ticket
          </button>
          <button type="submit" onClick={deleteTicketHandler}>
            Delete Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default TicketId;
