import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
