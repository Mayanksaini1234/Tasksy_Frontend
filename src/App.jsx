import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Custom/Header.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import { ToDoContext } from "./context/ToDOContext.jsx";
function App() {
  const { isAuthenticated } = useContext(ToDoContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"  element={ isAuthenticated ? <Home/> : <Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/myProfile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
