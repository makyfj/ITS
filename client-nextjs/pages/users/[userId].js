import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const User = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const { userId } = router.query;
  const { name, email } = userInfo;

  useEffect(() => {
    const getUserInfo = async () => {
      const { data, status } = await axios.get(`${API_URL}/${userId}`);

      if (status === 200) {
        setUserInfo(data);
      }
    };

    getUserInfo();
  }, [userId]);

  return (
    <div>
      <h1>User Info</h1>
      <ul>
        <li>{name}</li>
        <li>{email}</li>
      </ul>
    </div>
  );
};

export default User;
