import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../constants/apiURL";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../app/features/auth/authSlice";

const UserProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userId } = router.query;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.auth.status);

  console.log(userInfo);

  // Checks token to verify is user is authorized to login
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    const { data, status } = await axios.put(
      `${API_URL}/${userId}`,
      {
        name,
        email,
      },
      config
    );

    if (status === 200) {
      const { name, email } = data;
      setName(name);
      setEmail(email);
    }
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
    // const getUserInfo = async () => {
    //   const { data, status } = await axios.get(`${API_URL}/${userId}`, config);

    //   if (status === 200) {
    //     const { name, email } = data;
    //     setName(name);
    //     setEmail(email);
    //   }
    // };

    // getUserInfo();
    dispatch(getUser(userId));
    if (isSuccess) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userId, isSuccess, userInfo.email, userInfo.name]);

  return (
    <div className="userId">
      <h1>User Info</h1>
      <form>
        <label>Name: </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={name}
        />
        <br />

        <label>Email: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={email}
        />

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
