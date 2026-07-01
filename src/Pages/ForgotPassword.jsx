import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { server } from "../main";
import { toast } from "sonner";

const validate = ({ email }) => {
  const errors = [];
  if (!email) {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email is invalid");
  }
  return errors;
};
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate({ email });
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }
    setLoader(true);
    try {
      const data = await axios.post(
        `${server}/api/user/forgotPassword`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          //   necessary while post and put
          withCredentials: true,
        },
      );

      if (data) {
        setLoader(false);
        setEmail("");
        toast.success(data.data.message);
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      // Backend validation errors are sent as an array in the response, so we check if errors exist and are an array before iterating over them. If not, we display a generic error message.
      if (errors && Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err));
        // when  there are multiple errors in the form of array via backend validation
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
          Forgot password?
        </h2>
        <p className="text-center text-sm text-slate-400 mb-4">
          Enter your email and we&apos;ll send you a secure reset link.
        </p>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Email Address
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={loader}
              value={email}
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-950/60 shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 text-slate-100 placeholder:text-slate-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            disabled={loader}
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-300"
          >
            {loader ? <Loader className="animate-spin" /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
