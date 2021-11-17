import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const API_URL = "http://localhost:5000/api/users";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (status === 200) {
      console.log(data);
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
