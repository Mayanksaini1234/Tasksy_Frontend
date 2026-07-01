import React, { useContext, useEffect, useState } from "react";
import { ToDoContext } from "../context/ToDOContext";
import { useNavigate } from "react-router-dom";
import { server } from "../main.jsx";
import { toast } from "sonner";
import axios from "axios";
import {
  Loader,
  Plus,
  CheckCircle2,
  Sparkles,
  Trash2,
  Clock,
  CheckCircle,
  TableProperties,
} from "lucide-react";

const Home = () => {
  const { isAuthenticated, user, autoloading } = useContext(ToDoContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ title: "", discription: "" });
  const [loader, setLoader] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/api/task/tasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTaskList(res.data.Task);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (!isAuthenticated) return navigate("/login");
    const { title, discription } = data;
    try {
      const { data } = await axios.post(
        `${server}/api/task/tasks`,
        {
          title,
          discription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (data) {
        toast.success("Task is added!");
        setData({ title: "", discription: "" });
        setLoader(false);
        setRefresh((prev) => !prev);
        // It simple change the previos value to its opposite so that useEffect will run again and fetch the new data from the server and update the taskList state with the new data.
      }
    } catch (error) {
      console.log(error);
      console.log(error.response); // full response
      console.log(error.response.data); // actual backend data

      if (!error.response) {
        toast.error("Server not responding / Network error");
        return;
      }

      const status = error.response.status;
      const data = error.response.data;

      if (status === 429) {
        toast.error(data?.message || "Too many requests");
        return;
      }

      const errors = error.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        errors.forEach((err) => toast.error(err));
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoader(false);
    }
  };

  const checkHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/api/task/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      if (data) {
        setRefresh((prev) => !prev);
        toast.success("Task is Updated");
      }
    } catch (error) {
      console.log(error);

      if (!error.response) {
        toast.error("Server not responding / Network error");
        return;
      }

      const status = error.response.status;
      const data = error.response.data;

      if (status === 429) {
        toast.error(data?.message || "Too many requests");
        return;
      }

      toast.error("Task is not Updated!");
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/task/${id}`, {
        withCredentials: true,
      });
      if (data) {
        setRefresh((prev) => !prev);
        toast.success("Task is deleted!");
      }
    } catch (error) {
      console.log(error);

      if (!error.response) {
        toast.error("Server not responding / Network error");
        return;
      }

      const status = error.response.status;
      const data = error.response.data;

      if (status === 429) {
        toast.error(data?.message || "Too many requests");
        return;
      }
      toast.error("Task is not deleted ,there is an error!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle grid and glow */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(148,163,184,0.25) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(148,163,184,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(251,191,36,0.22),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(56,189,248,0.18),transparent_55%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur px-6 py-3 rounded-full shadow-sm mb-4 border border-slate-700/60">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              My Tasks
            </h1>
          </div>
          <p className="text-slate-300 text-lg">
            Organize your day, achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl shadow-xl p-6 border border-slate-800 hover:shadow-2xl transition-all duration-300">
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={dataHandler}
                    value={data.title}
                    required
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-slate-100 placeholder:text-slate-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Task Description
                  </label>
                  <textarea
                    name="discription"
                    onChange={dataHandler}
                    value={data.discription}
                    required
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-slate-100 placeholder:text-slate-500 transition-all duration-200 min-h-[120px] resize-none shadow-sm"
                    placeholder="Enter task description"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-semibold py-3 px-6 rounded-xl hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] transform disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loader}
                >
                  {loader ? (
                    <Loader className="animate-spin w-5 h-5" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Task
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/80 backdrop-blur rounded-2xl shadow-xl p-6 border border-slate-800 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-slate-50 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-amber-400" />
                Task List
              </h2>
              <div className="space-y-4">
                {!taskList || taskList.length === 0 ? (
                  <div className="text-center text-slate-400 py-12">
                    <div className="bg-slate-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-amber-400" />
                    </div>
                    <p className="text-lg text-slate-100">No tasks yet</p>
                    <p className="text-sm text-slate-500">
                      Add your first task to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {taskList.map((task) => {
                      const isCompleted = task.isCompleted;
                      return (
                        <div
                          key={task._id}
                          className={`group rounded-xl p-4 transition-all duration-300 hover:shadow-md border
                            ${
                              isCompleted
                                ? "bg-green-50/70 border-green-100"
                                : "bg-white/50 hover:bg-white/80 border-yellow-100"
                            }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3
                                className={`text-lg font-semibold mb-2 group-hover:text-yellow-600 transition-colors duration-200
                                  ${
                                    isCompleted
                                      ? "text-gray-500 line-through decoration-2 decoration-green-400"
                                      : "text-gray-900"
                                  }`}
                              >
                                {task.title}
                              </h3>
                              <p
                                className={`text-sm ${
                                  isCompleted
                                    ? "text-gray-400 line-through"
                                    : "text-gray-600"
                                }`}
                              >
                                {task.discription}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="isCompleted"
                                  onChange={() => checkHandler(task._id)}
                                  checked={task.isCompleted}
                                  className="sr-only peer"
                                />
                                <div
                                  className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 peer
                                    ${
                                      isCompleted
                                        ? "bg-green-400/80"
                                        : "bg-gray-200 peer-checked:bg-yellow-500"
                                    } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white`}
                                ></div>
                              </label>
                              <button
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                onClick={() => deleteTask(task._id)}
                                title="Delete task"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-yellow-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>
                                Created{" "}
                                {new Date(task.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <span
                              className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                                isCompleted
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                              }`}
                            >
                              <CheckCircle
                                className={`w-3 h-3 ${
                                  isCompleted ? "text-green-600" : ""
                                }`}
                              />
                              {isCompleted ? "Completed" : "Pending"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
