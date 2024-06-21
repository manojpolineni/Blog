import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8089/api/users/login",
        data
      );
      const { accessToken, id } = response.data;
      localStorage.setItem("Token", accessToken);
      localStorage.setItem("userId", id);
      dispatch(setUser({ userId: id, token: accessToken }));
      setLoading(false);
      navigate("/home", { replace: true });
      reset();
    } catch (error) {
      console.log("Login error", error.response.data.message);
      toast.error(error.response.data.message)
      setLoading(false);
    }
  };

  
  return (
    <section className="py-12 my-12 ">
        <h2 className="text-center text-blue-500 text-2xl font-bold">
          Login into your account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm mx-auto mt-8"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email Address is required",
                pattern: /^\S+@\S+$/i,
              })}
              aria-invalid={errors.mail ? "true" : "false"}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                Enter a valid email address
              </span>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type={!showPassword ? "password" : "text"}
              id="password"
              {...register("password", { required: true })} // Add ref here
              className="border border-gray-300 rounded-md px-3 py-2 w-full pr-10"
              // ref={passwordRef}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-[38px] right-0 flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">Password is Required</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" className="cursor-pointer h-4 w-4 mr-2" />
              Remember me
            </div>
            <p className="text-md font-small">
              <Link to="/forgotpassword">Forgot password?</Link>
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 w-full text-white mt-5 px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-base font-sm flex justify-center mt-5">
            Don't have an account?
            <Link
              to="/signup"
              className="mx-1 text-base font-medium flex flex-col text-blue-400"
            >
              Create an account
            </Link>
          </p>
        </form>
      </section>
  )
}

export default Login
