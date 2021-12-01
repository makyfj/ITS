import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import HeadPage from "../../../components/headPage";
import { getAllTickets } from "../../../app/features/ticket/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { tickets } = useSelector((state) => state.ticket);
  const { _id, isAdmin } = useSelector((state) => state.auth.userLogin);

  useEffect(() => {
    dispatch(getAllTickets(_id));

    if (!isAdmin) {
      router.push("/");
    }
  }, [dispatch, _id, isAdmin, router]);

  return (
    <>
      <div className="tableContainer">
        <HeadPage title="Admin: View Tickets" />
        <h1>Tickets</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date Created</th>
              <th>Date Resolved</th>
              <th>State</th>
              <th>Tags</th>
              <th>User</th>
              <th>Current Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/tickets/${ticket._id}`}>{ticket._id}</Link>
                </td>
                <td>{ticket.category}</td>
                <td>{ticket.description}</td>
                <td>{ticket.dateCreated}</td>
                <td>{ticket.dateResolved}</td>
                <td>{ticket.state ? "True" : "False"}</td>
                <td>{ticket.tags}</td>
                <td>{ticket.user}</td>
                <td>{ticket.currentAssignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tickets;
