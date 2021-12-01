import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateUser,
  deleteUser,
  clearStatus,
} from "../../app/features/auth/authSlice";

const UserProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { userId } = router.query;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const updateAccount = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId, name, email, password, isAdmin }));
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteUser(userId));
    router.push("/");
    dispatch(clearStatus());
  };

  useEffect(() => {
    dispatch(getUser(userId));
    setIsAdmin(userInfo.isAdmin);
  }, [dispatch, userId, userInfo.isAdmin]);

  return (
    <div className="userId">
      <h1>User Info</h1>
      <form>
        <label>Name: </label>
        <input
          type="text"
          value={name ? name : userInfo.name}
          onChange={(e) => setName(e.target.value)}
          placeholder={userInfo.name}
        />
        <br />

        <label>Email: </label>
        <input
          type="email"
          value={email ? email : userInfo.email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={userInfo.email}
        />

        <br />

        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*********"
        />

        <br />

        <label>isAdmin: {userInfo.isAdmin ? "True" : "False"}</label>

        <br />
        <button type="submit" onClick={updateAccount}>
          Update Account
        </button>

        <button type="submit" onClick={deleteAccount}>
          Delete Account
        </button>
      </form>
      <hr />
      <button className="createTicket">
        <Link href="/tickets" passHref={true}>
          Create ticket
        </Link>
      </button>
    </div>
  );
};

export default UserProfile;
