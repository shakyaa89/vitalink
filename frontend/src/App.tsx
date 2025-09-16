import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "./hooks/useAuthHook";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AboutUsPage from "./pages/AboutUsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { Loader2 } from "lucide-react";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/doctors" element={<HomePage />} />

        <Route
          path="/admin"
          element={
            authUser && authUser.role === "admin" ? (
              <AdminDashboardPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <RegisterForm />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
