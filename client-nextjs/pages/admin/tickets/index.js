import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../../app/features/ticket/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();

  const { tickets } = useSelector((state) => state.ticket);
  const { _id } = useSelector((state) => state.auth.userInfo);

  console.log(tickets);
  useEffect(() => {
    dispatch(getAllTickets(_id));
  }, [dispatch, _id]);
  return (
    <>
      <h1>Tickets</h1>
    </>
  );
};

export default Tickets;
