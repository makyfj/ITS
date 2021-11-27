import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearStatus } from "../app/features/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.auth.status);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, password, email }));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearStatus());
      router.push("/");
    }
  }, [router, isSuccess, dispatch]);

  return (
    <div className="register_container">
      <h1>Register</h1>
      <form>
        <label>Name: </label>
        <br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
