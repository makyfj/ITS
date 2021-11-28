import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

const API_URL = "http://localhost:5000/api/tickets";

const TicketId = () => {
  const router = useRouter();

  const { ticketId } = router.query;

  useEffect(() => {
    // Checks token to verify is user is authorized to login
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const getTicket = async () => {
      const { data, status } = axios.get(`${API_URL}/${ticketId}`, config);

      if (status === 200) {
        console.log(data);
      }
      getTicket();
    };
  }, [ticketId]);

  return (
    <div className="ticketInfo">
      <h1>Ticket Info</h1>
    </div>
  );
};

export default TicketId;
