import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Spinner from "../../components/spinner";
import Notification from "../../components/notification";
import HeadPage from "../../components/headPage";
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
  const { isSuccess, isFetching, isError, errorMessage } = useSelector(
    (state) => state.auth.status
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { userLogin } = useSelector((state) => state.auth);

  const updateAccount = (e) => {
    e.preventDefault();

    if (isAdmin === "true") {
      isAdmin = true;
    }

    if (isAdmin === "false") {
      isAdmin = false;
    }

    dispatch(updateUser({ userId, name, email, password, isAdmin }));

    if (isError) {
      toast.error(errorMessage);
    }

    if (isSuccess) {
      toast.success("User info updated");
    }
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteUser(userId));

    if (isError) {
      toast.error(errorMessage);
    }

    if (isSuccess) {
      toast.success("User deleted");
    }

    router.push("/");
    dispatch(clearStatus());
  };

  useEffect(() => {
    dispatch(getUser(userId));
    setIsAdmin(userInfo.isAdmin);
  }, [dispatch, userId, userInfo.isAdmin]);

  return (
    <div className="userId">
      <HeadPage title={`User Info: ${userInfo.name}`} />
      {isSuccess && <Notification />}
      {isFetching && <Spinner />}
      {isError && <Notification />}
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

        {userLogin.isAdmin ? (
          <label>
            Admin:
            <input
              type="text"
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
              placeholder={userInfo.isAdmin ? "true" : "false"}
            />
          </label>
        ) : (
          <label>Admin: {userInfo.isAdmin ? "true" : "false"}</label>
        )}

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
