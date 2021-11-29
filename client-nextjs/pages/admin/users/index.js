import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getAllUsers } from "../../../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { users } = useSelector((state) => state.auth);
  const { _id, isAdmin } = useSelector((state) => state.auth.userInfo);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers(_id));

    if (!isAdmin) {
      router.push("/");
    }
  }, [_id, dispatch, isAdmin, router]);

  return (
    <>
      <h1>Users</h1>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>******</td>
                <td>{user.isAdmin ? "True" : "False"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
