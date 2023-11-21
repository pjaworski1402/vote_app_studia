import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/token";
import Login from "./components/Login/Login";
import Vote from "./components/Vote/Vote";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      <Route path="/signin" element={<Login />} />
      <Route
        path="/profile"
        element={getToken() ? <Vote /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default AppRoutes;