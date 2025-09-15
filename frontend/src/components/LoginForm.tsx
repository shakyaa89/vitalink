// LoginForm.tsx
import { CircleUserRound } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="mt-10 md:mt-30 lg:mt-30 flex items-center justify-center px-10">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <CircleUserRound className="text-indigo-500 mb-5" size={100} />
          <h2 className="text-2xl font-bold text-gray-900 mb-0 text-center">
            Welcome back!
          </h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-indigo-500 font-medium hover:underline"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
