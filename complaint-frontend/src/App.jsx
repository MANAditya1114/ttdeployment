import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";

import AdminComplaints from "./pages/AdminComplaints";
import AdminAnalytics from "./pages/AdminAnalytics";

import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* ⭐ NEW GLOBAL BACKGROUND */
import Background from "./components/Background";

function App() {

  return (

    <BrowserRouter>

      {/* ⭐ Animated Background (does not affect routes) */}
      <Background />

      <Routes>

        {/* ================= AUTH ROUTES ================= */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= USER DASHBOARD ================= */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= USER FEATURES ================= */}

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN FEATURES ================= */}

        <Route
          path="/admin-complaints"
          element={
            <ProtectedRoute>
              <AdminComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />


        {/* ================= PROFILE ================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ================= AUTH UTILITIES ================= */}

        <Route path="/verify/:token" element={<VerifyAccount />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />


        {/* ================= FALLBACK ROUTE ================= */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;