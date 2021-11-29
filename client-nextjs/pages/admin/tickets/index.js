import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../../app/features/ticket/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();

  const { tickets } = useSelector((state) => state.ticket);
  const { userInfo } = useSelector((state) => state.auth);

  console.log(tickets);
  useEffect(() => {
    dispatch(getAllTickets(userInfo._id));
  }, [dispatch, userInfo._id]);
  return (
    <>
      <h1>Tickets</h1>
    </>
  );
};

export default Tickets;
