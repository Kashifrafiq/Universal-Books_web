import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Navigate, createRoutesFromElements } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import Home from "../../Pages/Home";
import Navbar from "../../component/Navbar";
import Login from "../../Pages/Login";
import Signup from "../../Pages/Signup";
import Dashboard from "../../Pages/Dashboard";
import AlbumDetails from "../../Pages/Album-Details/AlbumDetails";
import Subscription from "../../Pages/Subscription/Subscription";
import Albums from "../../Pages/Album-List/Album-list";
import ForgotPassword from "../../Pages/ForgotPassword";

// Hook to manage authentication and loading state
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, loading };
};

// Loader Component
const Loader = () => {
  return (
    <div style={{ color:"blue", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="spinner"></div>
    </div>
  );
};

// Protected route for logged-in users
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loader />; // Show loader while checking authentication
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

// Public route for non-logged-in users
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loader />; // Show loader while checking authentication
  }

  return !currentUser ? children : <Navigate to="/dashboard" replace />;
};

// Main router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Navbar />}>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/album-details"
        element={
          <ProtectedRoute>
            <AlbumDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        }
      />
      <Route
        path="/album-list"
        element={
          <ProtectedRoute>
            <Albums />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const Router_App = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true); // Simulate content load time
    }, 1000); // Adjust time as necessary

    return () => clearTimeout(timer);
  }, []);

  if (!contentLoaded) {
    return <Loader />; // Show loader until content is loaded
  }

  return <RouterProvider router={router} />;
};

export default Router_App;
