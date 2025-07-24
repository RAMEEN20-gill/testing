// --- src/components/Header.jsx ---
import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="flex items-center p-4 bg-white shadow-md">
      <img src={logo} alt="Logo" className="w-32 h-auto" />
      <h1 className="ml-4 text-2xl font-bold">Task Manager</h1>
    </header>
  );
};

export default Header;
