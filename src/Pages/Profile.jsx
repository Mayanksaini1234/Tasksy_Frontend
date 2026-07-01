import React, { useContext, useEffect, useState } from "react";
import { ToDoContext } from "../context/ToDOContext";
import { Loader2, User, Mail, Edit2, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { server } from "../main";
import axios from "axios";

const Profile = () => {
  const {
    user,
    setUser,
    loader,
    setLoader,
    isAuthenticated,
    autoloading,
  } = useContext(ToDoContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setName(user?.name );
  }, [user]);

  
  useEffect(() => {
    if (autoloading) return; // wait until auth check finishes
  
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, autoloading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoader(true);

    try {
      const { data } = await axios.put(
        `${server}/api/user/updateUser`,
        { name },
        { withCredentials: true }
      );
 console.log(data);
      toast.success("Profile updated successfully");

      setUser(data.user);   // this is the most important line, it updates the user context with the new user data returned from the server after the update.
      setShowForm(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Profile update failed"
      );
    } finally {
      setLoader(false);
    }
  };

  if (autoloading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-slate-950">
        <Loader2 className="animate-spin w-10 h-10 text-amber-400" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      {loader ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-10 h-10 text-amber-400" />
        </div>
      ) : (
        <div className="max-w-md w-full bg-slate-900/90 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 p-6">
            <div className="flex items-center justify-center">
              <div className="bg-slate-950/90 p-4 rounded-full shadow-lg border border-amber-300/40">
                <User className="w-12 h-12 text-amber-300" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-amber-300" />
                  <div>
                    <p className="text-sm text-slate-400">Name</p>
                    <p className="text-lg font-semibold text-slate-50">
                      {user?.name}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-full p-2 text-amber-300 hover:text-amber-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 focus:ring-offset-slate-900 transition-colors"
                >
                  {showForm ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Edit2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-300" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-lg font-semibold text-slate-50">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Member Since */}
            <div className="pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400 text-center">
                Member since{" "}
                {user?.createdAt &&
                  new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Update Form */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4 border-t border-slate-700 pt-4"
              >
                <h2 className="text-lg font-semibold text-slate-50 text-center">
                  Update Profile
                </h2>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 shadow-sm focus:border-amber-400 focus:ring-amber-400 text-sm text-slate-100 placeholder:text-slate-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
                  >
                    {loader ? (
                      <Loader className="animate-spin w-5 h-5" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
