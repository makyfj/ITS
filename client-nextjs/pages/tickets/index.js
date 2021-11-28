import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../app/features/ticket/ticketSlice";

const API_URL = "http://localhost:5000/api/tickets";

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

    // Get ticket id to redirect to /tickets/id
    if (isSuccess) {
      router.push(`/tickets/${_id}`);
    }
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };

    // const { data, status } = await axios.post(
    //   `
    //   ${API_URL}/ticket`,
    //   { category, description, tags, currentAssignee },
    //   config
    // );

    // if (status === 201) {
    //   const { _id } = data;
    //   console.log(data);
    //   router.push(`/tickets/${_id}`);
    // }
  };

  return (
    <div className="ticket">
      <form>
        <label>Category: </label>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Description: </label>
        <textarea
          type="text"
          rows="4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Tags: </label>
        <input
          type="text"
          placeholder="Tags"
          value={ticketTags}
          onChange={(e) => setTags(e.target.value)}
        />
        <label>Current Assignee: </label>
        <input
          type="text"
          placeholder="Current Assignee"
          value={currentAssignee}
          onChange={(e) => setCurrentAssignee(e.target.value)}
        />

        <hr />

        <button type="submit" onClick={submitHandler}>
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default Ticket;
