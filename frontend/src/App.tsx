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

function App() {
  const { checkAuth, authUser } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/doctors" element={<HomePage />} />

        <Route path="/admin" element={<HomePage />} />

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
