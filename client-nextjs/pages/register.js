import React, { useState } from "react";
import { useRouter } from "next/router";

const API_URL = "http://localhost:5000/api/users";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <div>
      <h1>Register</h1>
      <form></form>
    </div>
  );
};

export default Register;
