import React, { useEffect } from "react";
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
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
      </div>
    </>
  );
};

export default ViewTickets;
