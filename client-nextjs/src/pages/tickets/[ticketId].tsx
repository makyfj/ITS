import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import Notification from "@/components/notification";
import Spinner from "@/components/spinner";
import HeadPage from "@/components/headPage";
import {
  getTicket,
  updateTicket,
  deleteTicket,
  clearTicketStatus,
  clearTicketInfo,
  getCategories,
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
  const { isSuccess, isError, errorMessage, isFetching } = useSelector(
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

  const { ticketId } = router.query;
  const { _id } = ticketInfo;

  const updateTicketHandler = (e) => {
    e.preventDefault();

    let tags;
    if (ticketTags === "") {
      tags = ticketInfo.tags;
    } else {
      tags = ticketTags.split(",");
    }

    if (state === "true") {
      state = true;
    } else {
      state = false;
    }

    dispatch(
      updateTicket({ _id, category, description, tags, state, currentAssignee })
    );

    if (isError) {
      toast.error(errorMessage);
    }

    if (isSuccess) {
      toast.success("Ticket updated");
    }
  };

  const deleteTicketHandler = (e) => {
    e.preventDefault();
    dispatch(deleteTicket(_id));

    if (isError) {
      toast.error(errorMessage);
    }

    if (isSuccess) {
      toast.success("Ticket deleted");
      dispatch(clearTicketInfo());
      dispatch(clearTicketStatus());
      router.push("/");
    }
  };

  useEffect(() => {
    const dummyId = "id";
    dispatch(getCategories(dummyId));
    dispatch(getTicket(ticketId));
    setState(ticketInfo.state);
  }, [dispatch, ticketId, router, ticketInfo.state]);

  return (
    <>
      <HeadPage title={`Ticket Info: ${ticketInfo.category}`} />
      {isSuccess && <Notification />}
      {isFetching && <Spinner />}
      {isError && <Notification />}
      <h1 className="titlePage">Ticket Info</h1>
      <div className="ticket">
        <form>
          <label>ID: {ticketInfo._id}</label>
          <label>
            Category:{" "}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryArray.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
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
