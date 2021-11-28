import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../constants/apiURL";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../app/features/auth/authSlice";

const UserProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { userId } = router.query;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.auth.status);

  // Checks token to verify is user is authorized to login
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const updateAccount = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId, name, email, password, isAdmin }));
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    const { data, status } = await axios.delete(`${API_URL}/${userId}`, config);

    if (status === 200) {
      console.log(data);
      router.push("/");
    }
  };

  useEffect(() => {
    dispatch(getUser(userId));
    if (isSuccess) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPassword(userInfo.password);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [
    dispatch,
    userId,
    isSuccess,
    userInfo.email,
    userInfo.name,
    userInfo.isAdmin,
    userInfo.password,
  ]);

  return (
    <div className="userId">
      <h1>User Info</h1>
      <form>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={name}
        />
        <br />

        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={email}
        />

        <br />

        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={password}
        />

        <br />

        <label>isAdmin: {isAdmin ? "True" : "False"}</label>

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
