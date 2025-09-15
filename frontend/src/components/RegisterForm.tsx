// LoginForm.tsx
import { ShieldUser } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthHook";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const { register, isRegistering } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      profilePic: image,
    };

    await register(data, navigate);
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_SIZE) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setImage(base64Image);
    };
  };

  return (
    <div className="mt-15 md:mt-15 flex items-center justify-center px-10">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <ShieldUser className="text-indigo-500 mb-5" size={100} />
          <h2 className="text-2xl font-bold text-gray-900 mb-0 text-center">
            Welcome!
          </h2>
          <p>Register your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John doe"
            />
          </div>

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
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Profile Picture</label>
            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-indigo-500 font-medium hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
