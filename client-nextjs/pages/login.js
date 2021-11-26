import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
      const { _id } = data;
      router.push(`/users/${_id}`);
    }
  };

  return (
    <div className="login_container">
      <h1>Login</h1>
      <form>
        <label>Email: </label>
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label>Password: </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
