import React from 'react';
import logo from '../assets/logo.png'; // ✅ Make sure the path is correct

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center">
      <img src={logo} alt="Logo" className="w-32 h-auto" />
      <h1 className="text-xl font-bold ml-4">Task Manager</h1>
    </header>
  );
};

export default Header;
