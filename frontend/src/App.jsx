import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import SharedTasksPage from "./pages/SharedTasksPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AttachmentsPage from "./pages/AttachmentsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotificationPanel from "./components/NotificationPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Header from './components/Header';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <NotificationPanel />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/edit/:id" element={<EditTaskPage />} />
            <Route path="/shared" element={<SharedTasksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/attachments" element={<AttachmentsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
