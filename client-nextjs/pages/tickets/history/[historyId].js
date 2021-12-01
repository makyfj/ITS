import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../../../app/features/ticket/ticketSlice";

const CaseHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { caseHistory } = useSelector((state) => state.ticket.ticketInfo);

  const { historyId } = router.query;

  console.log(caseHistory);

  useEffect(() => {
    dispatch(getTicket(historyId));
  }, [dispatch, historyId]);

  return (
    <>
      <div className="tableContainer">
        <h1>Case History</h1>
        <p>Ticket ID: </p>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Date Created</th>
              <th>Date Resolved</th>
              <th>State</th>
              <th>Tags</th>
              <th>Current Assignee</th>
            </tr>
          </thead>
          <tbody>
            {caseHistory.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.category}</td>
                <td>{ticket.description}</td>
                <td>{ticket.dateCreated}</td>
                <td>{ticket.dateResolved}</td>
                <td>{ticket.state ? "True" : "False"}</td>
                <td>{ticket.tags}</td>
                <td>{ticket.currentAssignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CaseHistory;
