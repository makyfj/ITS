import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

const API_URL = "http://localhost:5000/api/tickets";

const TicketId = () => {
  const router = useRouter();

  const [ticketInfo, setTicketInfo] = useState();
  // const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  // const [dateCreated, setDateCreated] = useState("");
  // const [dateResolved, setDateResolved] = useState("");
  // const [state, setState] = useState();
  // const [tags, setTags] = useState([]);
  // const [user, setUser] = useState("");
  // const [caseHistory, setCaseHistory] = useState([]);
  // const [currentAssignee, setCurrentAssignee] = useState("");

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
