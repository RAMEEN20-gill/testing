import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SharedTasks from "./pages/SharedTasks";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

import { useEffect, useState } from "react";
import axios from "./utils/axios";

const AppRouter = () => {
  const [auth, setAuth] = useState(null);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setAuth(false);
      try {
        await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuth(true);
      } catch {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div className="text-center p-10">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={auth ? <Navigate to="/" /> : <Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={auth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/shared" element={auth ? <SharedTasks /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={auth ? <Analytics /> : <Navigate to="/login" />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
