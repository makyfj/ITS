import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import HeadPage from "@/components/headPage";
import {
  getAllTickets,
  getCategories,
} from "@/app/features/ticket/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [filterCategory, setFilterCategory] = useState("");

  const { tickets } = useSelector((state) => state.ticket);
  const { _id, isAdmin } = useSelector((state) => state.auth.userLogin);
  const { categories } = useSelector((state) => state.ticket);

  // For Category State Management
  let categoryArray = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].category.length; j++) {
      categoryArray.push(categories[i].category[j]);
    }
  }

  categoryArray.push("All");

  useEffect(() => {
    dispatch(getAllTickets(_id));

    // Dummy id to access state
    const tempId = "id";
    dispatch(getCategories(tempId));

    if (!isAdmin) {
      router.push("/");
    }
  }, [dispatch, _id, isAdmin, router]);

  return (
    <>
      <div className="tableContainer">
        <HeadPage title="Admin: View Tickets" />
        <h1>Tickets</h1>
        <div className="searchCategory">
          <label>
            Search by Category:{" "}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              required
            >
              {categoryArray.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
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
            {tickets.map((ticket, index) => (
              <tr key={index}>
                {ticket.category === filterCategory && (
                  <>
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
                  </>
                )}
                {filterCategory === "All" && (
                  <>
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
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tickets;
