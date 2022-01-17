import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "@/app/hooks";
import HeadPage from "@/components/headPage";
import { RegisterRequest } from "@/types/User";
import { useRegisterUserMutation } from "@/app/services/userApi";
import { setCredentials } from "@/app/features/auth/authSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const dispatch = useAppDispatch();

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    const user = await registerUser(data).unwrap();
    dispatch(setCredentials(user));
  };

  return (
    <div className="register_container">
      <HeadPage title="Register" />
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          arial-label="Enter name"
          id="name"
          type="text"
          {...register("name", { required: "The name is required" })}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="email">Email</label>
        <input
          arial-label="Enter email"
          id="email"
          type="email"
          {...register("email", { required: "The email is required" })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input
          arial-label="Enter password"
          id="password"
          type="password"
          {...register("password", {
            required: "The password is required",
            minLength: {
              value: 6,
              message: "Minimum length must be at least 6 characters",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
