import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../app/features/ticket/ticketSlice";

const Ticket = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ticketTags, setTags] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");

  const dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.ticket.ticketStatus);

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    const tags = ticketTags.split(",");

    dispatch(createTicket({ category, description, tags, currentAssignee }));
    if (isSuccess) {
      router.push("/tickets/view");
    }
  };

  return (
    <>
      <h1>Create a ticket</h1>
      <div className="ticket">
        <form>
          <label>Category: </label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label>Description: </label>
          <textarea
            type="text"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Tags: </label>
          <input
            type="text"
            placeholder="Tags"
            value={ticketTags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          <label>Current Assignee: </label>
          <input
            type="text"
            placeholder="Current Assignee"
            value={currentAssignee}
            onChange={(e) => setCurrentAssignee(e.target.value)}
            required
          />

          <hr />

          <button type="submit" onClick={submitHandler}>
            Create Ticket
          </button>
        </form>
      </div>
    </>
  );
};

export default Ticket;
