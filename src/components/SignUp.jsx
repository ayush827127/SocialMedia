import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const { createUser, signUpWithGmail } = useContext(AuthContext);

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((result) => {
        alert("Account creation successfully!");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("user already exist! Please Login");
        navigate("/");
        document.getElementById("my_modal_5").show();
      });
  };

  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        alert("Login Successfully !");
        document.getElementById("my_modal_5").close();
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-5">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create A Account!</h3>

          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error */}

          {/* login btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn btn-primary text-white"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* or horizontal line */}
        <div className="flex">
          <hr
            className="my-1 bg-black "
            style={{ height: "2px", width: "46%" }}
          />
          <p style={{ margin: "11px", marginTop: "-2.5%" }}> or </p>
          <hr
            className="my-1 bg-black "
            style={{ height: "2px", width: "46%" }}
          />
        </div>

        {/* social sign in */}
        <div
          className="text-center space-x-8 mb-5 form-control "
          style={{ margin: "2rem", marginTop: 0, marginBottom: 0 }}
        >
          <button
            className="btn btn-primary text-white hover:btn-warning hover:text-white"
            onClick={handleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
