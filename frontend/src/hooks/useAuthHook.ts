import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AuthState {
  authUser: any | null;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isCheckingAuth: boolean;
  login: (
    data: { email: string; password: string },
    navigate: Function
  ) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: (navigate: Function) => Promise<void>;
  register: (
    data: {
      name: string;
      email: string;
      password: string;
    },
    navigate: Function
  ) => Promise<void>;
  doctorRegister: (
    data: {
      name: string;
      email: string;
      password: string;
      profilePic: string;
      specialization: string;
      experience: number;
      fee: number;
      startTime: string;
      endTime: string;
    },
    navigate: Function
  ) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isRegistering: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });
      set({ authUser: response.data });
    } catch (error: any) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      set({ authUser: response.data.user });
      navigate("/");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  register: async (data, navigate) => {
    set({ isRegistering: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      set({ authUser: response.data.user });
      navigate("/");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      set({ isRegistering: false });
    }
  },

  logout: async (navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      set({ authUser: null });
      toast.success(response.data.message);
      navigate("/");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  },

  doctorRegister: async (data, navigate) => {
    set({ isRegistering: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor/register",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      set({ isRegistering: false });
    }
  },
}));
