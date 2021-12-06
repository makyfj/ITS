import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import HeadPage from "../components/headPage";
import { registerUser, clearStatus } from "../app/features/auth/authSlice";
import { toast } from "react-toastify";
import Notification from "../components/notification";
import Spinner from "../components/spinner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isSuccess, isError, isFetching, errorMessage } = useSelector(
    (state) => state.auth.status
  );

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, password, email }));
    if (isError) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearStatus());
      router.push("/");
    }
  }, [router, isSuccess, dispatch]);

  return (
    <div className="register_container">
      <HeadPage title="Register" />
      {isError && <Notification />}
      {isFetching && <Spinner />}
      <h1>Register</h1>
      <form>
        <label>Name: </label>
        <br />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label>Email: </label>
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label>Password: </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
