"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaPhoneVolume } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup"; // Import Yup
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "../_context/UserContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  let { setToken, token } = useContext(UserContext);
  //  Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name can't be longer than 30 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(10, "You must be at least 10 years old")
      .max(100, "Age must be below 100")
      .required("Age is required"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
  });
  //  Register Function
  async function registerFunc(values) {
    try {
      setLoading(true);
      let res = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
      toast.success("Registration successful", { position: "top-center" });
      router.push("/login");
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  }
  //  Formik
  let formik = useFormik({
    initialValues: { name: "", email: "", password: "", age: "", phone: "" },
    validationSchema, // Add Yup validation schema
    onSubmit: registerFunc,
  });
  useEffect(() => {
    if (!token) {
      router.push("/register");
    } else {
      redirect("/");
    }
  }, [token]);
  return (
    <section className="w-full h-[100vh] bg-[#4070f4]">
      <div className="container flex items-center justify-center w-full h-full">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full mx-5 md:w-[400px] bg-white px-5 py-10 rounded-sm"
        >
          <h1 className="font-bold text-2xl mb-10 w-fit px-2 text-black/80">
            Registration
          </h1>
          {/* Name Input */}
          <div className="relative w-full mb-5">
            <div className="absolute left-0 top-2.5 flex items-center ps-3.5 pointer-events-none">
              <FaRegUser className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full ps-10 p-2.5"
              placeholder="Enter Your Name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="relative w-full mb-5">
            <div className="absolute left-0 top-2.5 flex items-center ps-3.5 pointer-events-none">
              <MdEmail className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full ps-10 p-2.5"
              placeholder="Enter Your Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative w-full mb-5">
            <div className="absolute left-0 top-2.5 flex items-center ps-3.5 pointer-events-none">
              <RiLockPasswordLine className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full ps-10 p-2.5"
              placeholder="Enter Your Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Age Input */}
          <div className="relative w-full mb-5">
            <div className="absolute left-0 top-2.5 flex items-center ps-3.5 pointer-events-none">
              <SlCalender className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="number"
              name="age"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full ps-10 p-2.5"
              placeholder="Enter Your Age"
              {...formik.getFieldProps("age")}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.age}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="relative w-full mb-5">
            <div className="absolute left-0 top-2.5 flex items-center ps-3.5 pointer-events-none">
              <FaPhoneVolume className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="tel"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full ps-10 p-2.5"
              placeholder="Enter Your Phone"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full text-center mb-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-[#4070f4] hover:bg-[#3669f5] focus:outline-none font-medium rounded-sm text-lg px-5 py-[7px] text-center"
            >
              {loading ? (
                <div
                  role="status"
                  className="w-full flex item-center justify-center"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
            {error && (
              <div
                className="p-2 my-5 text-[18px] tracking-[1px] text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>

          <p className="w-full text-center text-[17px] text-black/80">
            Already have an account ?{" "}
            <Link className="text-[#4070f4]" href="/login">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
