import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Spinner from "../../components/spinner";
import Notification from "../../components/notification";
import HeadPage from "../../components/headPage";
import {
  createTicket,
  getCategories,
} from "../../app/features/ticket/ticketSlice";

const Ticket = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ticketTags, setTags] = useState("");
  const [currentAssignee, setCurrentAssignee] = useState("");

  const dispatch = useDispatch();

  const { isSuccess, isFetching, isError, errorMessage } = useSelector(
    (state) => state.ticket.ticketStatus
  );
  const { categories } = useSelector((state) => state.ticket);

  // For Category State Management
  let categoryArray = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].category.length; j++) {
      categoryArray.push(categories[i].category[j]);
    }
  }

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    const tags = ticketTags.split(",");

    if (category === "") {
      category = "Workplace";
    }

    dispatch(createTicket({ category, description, tags, currentAssignee }));

    if (isError) {
      toast.error(errorMessage);
    }

    if (isSuccess) {
      router.push("/tickets/view");
    }
  };

  useEffect(() => {
    const id = "id";
    dispatch(getCategories(id));
  }, [dispatch]);

  return (
    <>
      <HeadPage title="Create a ticket" />
      {isFetching && <Spinner />}
      {isError && <Notification />}
      <h1 className="titlePage">Create a ticket</h1>
      <div className="ticket">
        <form>
          <label>Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categoryArray.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
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
