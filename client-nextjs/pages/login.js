import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { loginUser } from "../app/features/auth/authSlice";
import HeadPage from "../components/headPage";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import Notification from "../components/notification";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { isSuccess, isFetching, isError, errorMessage } = useSelector(
    (state) => state.auth.status
  );
  const { userLogin } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));

    if (isError) {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/users/${userLogin._id}`);
    }
  }, [isSuccess, router, userLogin._id]);

  return (
    <div className="login_container">
      <HeadPage title="Login" />
      {isFetching && <Spinner />}
      {isError && <Notification />}
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
