import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
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
        "http://localhost:8089/api/users/register",
        data
      );
      setLoading(false);
      toast.success(response.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="py-12 my-12">
      <h2 className="text-center text-blue-500 text-2xl font-bold">
        Create Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-semibold mb-1">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            {...register("userName", { required: true })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {errors.userName && (
            <span className="text-red-500 text-sm">UserName is required</span>
          )}
        </div>

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
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold mb-1">
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            {...register("phone", { required: true })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">Enter a valid Phone</span>
          )}
        </div>

        <div className="mb-4 relative">
          <label htmlFor="gender" className="block text-sm font-semibold mb-1">
            Gender
          </label>
          <select
            {...register("gender", { required: true })}
            defaultValue="Male" // Set default value for select element
            className="border border-gray-300 rounded-md px-3 py-2 w-full "
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">Please Select Gender</span>
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

        <button
          type="submit"
          className="bg-blue-500 w-full text-white mt-5 px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : " Sign Up "}
        </button>
        <p className="text-base font-sm flex justify-center mt-5">
          Already have an account?
          <Link
            to="/"
            className="mx-1 text-base font-normal flex flex-col underline text-blue-400"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
