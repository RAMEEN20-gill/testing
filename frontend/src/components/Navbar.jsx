import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-20 h-auto mr-3" />
        <Link to="/" className="text-xl font-bold">Task Manager</Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
            <Link to="/shared" className="hover:text-gray-300">Shared Tasks</Link>
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
