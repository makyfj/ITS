import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import HeadPage from "@/components/headPage";
import { getUserTickets } from "@/app/features/ticket/ticketSlice";

// This is for the user to see their tickets
const ViewTickets = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.userInfo);
  const { userTickets } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getUserTickets(_id));
  }, [_id, dispatch]);
  return (
    <>
      <div className="tableContainer">
        <HeadPage title="My tickets" />
        <h1>My Tickets</h1>
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
              <th>Case History</th>
            </tr>
          </thead>
          <tbody>
            {userTickets.map((ticket, index) => (
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
                <td>
                  <Link href={`/tickets/history/${ticket._id}`}>
                    View Case History
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewTickets;
