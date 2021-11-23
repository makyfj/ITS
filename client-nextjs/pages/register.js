import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });

    if (status === 201) {
      console.log(data);
      router.push("/");
    }
  };

  return (
    <div className="register_container">
      <h1>Register</h1>
      <form>
        <label>Name: </label><br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label>Email: </label><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label>Password: </label><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
