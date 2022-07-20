import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../service/User";
import { Toast } from "../componant/toastalert/toastalert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function User() {
  const [login, { isSuccess: loginSuccess }] = useLoginUserMutation();
  useEffect(() => {
    {
      loginSuccess &&
        Toast.fire({
          icon: "success",
          title: "login Success Fully.",
        });
    }
  }, [loginSuccess]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("username is required")
      .min(5, "username must be at least 5 characters")
      .max(25, "username must not exceed 25 characters"),
    password: Yup.string()
      .required("password is required")
      .min(6, "Password must be more than 6 characters")
      .max(6, "Password must not exceed 6 characters"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    await login(data)
      .then((res) => {
        if (res.error) {
          Toast.fire({
            icon: "warning",
            title: res.error.data,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "550px" }}
    >
      <div className="container mt-5 w-25 rounded-1 bg-light">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-1 my-3">
          <div className="text-center">
            <h3>Login</h3>
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              placeholder="Username"
              {...register("username")}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              {...register("password")}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
