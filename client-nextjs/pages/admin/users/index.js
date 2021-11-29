import React, { useEffect } from "react";
import { getAllUsers } from "../../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Users;
