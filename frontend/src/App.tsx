import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import { Heading1 } from "lucide-react";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/doctors" element={<HomePage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
