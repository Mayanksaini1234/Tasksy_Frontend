import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToDoContext } from "../../context/ToDOContext";
import axios from "axios";
import { server } from "../../main";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const Header = () => {
  const [loader, setLoader] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(ToDoContext);
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${server}/api/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (data) {
        toast.success("You are successfully logged out!");
        setIsAuthenticated(false);
        navigate("/login");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoader(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Tasksy
            </h1>
            <span className="text-xs bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-semibold">
              v1
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                to="/"
                className="text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-slate-800/70"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/myProfile"
                className="text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-slate-800/70"
              >
                Profile
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-sm"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logoutUser}
                disabled={loader}
                className="flex items-center justify-center text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-sm disabled:opacity-60"
              >
                {loader ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Logout"
                )}
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
