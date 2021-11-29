import React, { useEffect } from "react";
import { getAllUsers } from "../../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.auth.userInfo);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers(_id));
  }, [_id, dispatch]);

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Users;
