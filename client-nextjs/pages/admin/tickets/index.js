import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { getAllTickets } from "../../../app/features/ticket/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { tickets } = useSelector((state) => state.ticket);
  const { _id, isAdmin } = useSelector((state) => state.auth.userInfo);

  console.log(tickets);
  useEffect(() => {
    dispatch(getAllTickets(_id));

    if (!isAdmin) {
      router.push("/");
    }
  }, [dispatch, _id, isAdmin, router]);

  return (
    <>
      <h1>Tickets</h1>
      <div className="ticketContainer">
        <table>
          <tr>
            <th>Id</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date Created</th>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Tickets;
