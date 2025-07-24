import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import logo from "../assets/logo.png"; // ✅ Import the logo

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96"
      >
        {/* ✅ Logo at top */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 dark:text-white mb-4"
        />
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
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded"
        >
          Sign Up
        </button>
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
