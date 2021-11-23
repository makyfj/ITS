import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tickets";

const Ticket = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ticketTags, setTags] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(category, description, ticketTags, currentAssignee);
    const tags = ticketTags.split(",");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { data, status } = await axios.post(
      `
      ${API_URL}/ticket`,
      { category, description, tags, currentAssignee },
      config
    );

    console.log(data);
  };

  return (
    <div className="ticket">
      <form>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          type="text"
          rows="4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags"
          value={ticketTags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Current Assignee"
          value={currentAssignee}
          onChange={(e) => setCurrentAssignee(e.target.value)}
        />

        <button type="submit" onClick={submitHandler}>
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default Ticket;
