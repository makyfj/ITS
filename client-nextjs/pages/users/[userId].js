import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const User = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userId } = router.query;

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
    const getUserInfo = async () => {
      const { data, status } = await axios.get(`${API_URL}/${userId}`, config);

      if (status === 200) {
        const { name, email } = data;
        setName(name);
        setEmail(email);
      }
    };

    getUserInfo();
  }, [userId]);

  return (
    <div className="userId">
      <h1>User Info</h1>
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={name}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={email}
        />
        <button type="submit" onClick={updateAccount}>
          Update Account
        </button>
        <button type="submit" onClick={deleteAccount}>
          Delete Account
        </button>
      </form>
      <Link href="/tickets">
        <p>Create a ticket</p>
      </Link>
    </div>
  );
};

export default User;
