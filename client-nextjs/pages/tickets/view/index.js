import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { getUserTickets } from "../../../app/features/ticket/ticketSlice";

const ViewTickets = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.auth.userInfo);
  const { userTickets } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getUserTickets(_id));
  }, [_id, dispatch]);
  return (
    <>
      <h1>View Tickets</h1>
      <div className="tableContainer">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewTickets;
