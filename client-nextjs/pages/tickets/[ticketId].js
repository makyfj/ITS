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
  const [state, setState] = useState(false);
  const [ticketTags, setTicketTags] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { ticketInfo } = useSelector((state) => state.ticket);
  const { isSuccess } = useSelector((state) => state.ticket.ticketStatus);

  const { ticketId } = router.query;
  const { _id } = ticketInfo;

  const updateTicketHandler = (e) => {
    e.preventDefault();
    const tags = ticketTags.split(",");

    if (state === "true") {
      state = true;
    } else {
      state = false;
    }

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
    dispatch(getTicket(ticketId));
    setState(ticketInfo.state);
  }, [dispatch, ticketId, router, ticketInfo.state]);

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
              value={category ? category : ticketInfo.category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={ticketInfo.category}
            />
          </label>
          <label>
            Description:
            <textarea
              type="text"
              value={description ? description : ticketInfo.category}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder={ticketInfo.description}
            />
          </label>
          <label>Date Created: {ticketInfo.dateCreated}</label>
          <label>Date Resolved: {ticketInfo.dateResolved}</label>
          <label>
            State:
            <input
              type="radio"
              name="radio-group"
              value={true}
              onChange={(e) => setState(e.target.value)}
            />{" "}
            True
            <input
              type="radio"
              name="radio-group"
              value={false}
              defaultChecked={ticketInfo.state === false}
              onChange={(e) => setState(e.target.value)}
              disabled={ticketInfo.state === true}
            />{" "}
            False
          </label>
          <label>
            Tags:{" "}
            <input
              type="text"
              value={ticketTags ? ticketTags : ticketInfo.tags}
              onChange={(e) => setTicketTags(e.target.value)}
              placeholder={ticketInfo.tags}
            />
          </label>
          <label>User: {ticketInfo.user}</label>
          <label>
            Current Assignee:{" "}
            <input
              type="text"
              value={
                currentAssignee ? currentAssignee : ticketInfo.currentAssignee
              }
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
