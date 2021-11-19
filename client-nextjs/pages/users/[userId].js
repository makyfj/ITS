import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const User = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userId } = router.query;

  const updateAccount = async (e) => {
    e.preventDefault();
    const { data, status } = await axios.put(`${API_URL}/${userId}`, {
      name,
      email,
    });

    if (status === 200) {
      const { name, email } = data;
      setName(name);
      setEmail(email);
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    const { data, status } = await axios.delete(`${API_URL}/${userId}`);

    if (status === 200) {
      console.log("User removed");
      router.push("/");
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data, status } = await axios.get(`${API_URL}/${userId}`);

      if (status === 200) {
        const { name, email } = data;
        setName(name);
        setEmail(email);
      }
    };

    getUserInfo();
  }, [userId]);

  return (
    <div>
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
    </div>
  );
};

export default User;
