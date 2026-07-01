import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { server } from "../main";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const Validate = ({ password, confirmPassword }) => {
  const errors = [];
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }
  if (!confirmPassword) {
    errors.push("Confirm Password is required");
  } else if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }
  return errors;
};
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = Validate({ password, confirmPassword });
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }
    setLoader(true);
    try {
      const data = await axios.put(
        `${server}/api/user/reset-password/${token}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (data) {
        setLoader(false);
        toast.success(data.data.message);
        navigate("/login");
      }
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err));
        // when  there are multiple errors in the form of array
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
        // when there  is only one error in the form of string
      }
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur rounded-2xl shadow-xl border border-slate-800 p-8">
        <h2 className="text-center text-2xl font-bold text-slate-50 mb-2">
          Reset password
        </h2>
        <p className="text-center text-sm text-slate-400 mb-4">
          Choose a strong new password to secure your account.
        </p>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-950/60 shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 text-slate-100 placeholder:text-slate-500"
              placeholder="Enter your new Password"
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-950/60 shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 text-slate-100 placeholder:text-slate-500"
              placeholder="Confirm your new Password"
            />
          </div>
          <button
            disabled={loader}
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-300"
          >
            {loader ? <Loader className="animate-spin" /> : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
