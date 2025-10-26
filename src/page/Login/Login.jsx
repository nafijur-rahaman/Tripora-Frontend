import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { FiLogIn, FiUser, FiShield, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const { LoginUser, loginWithGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "";
  const adminPassword = import.meta.env.VITE_COMMON_PASSWORD || "";
  const customerEmail = import.meta.env.VITE_CLIENT_EMAIL || "";
  const customerPassword = import.meta.env.VITE_COMMON_PASSWORD || "";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const performLogin = async (email, password) => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const result = await LoginUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Logged in as ${result.user.email}`,
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "rounded-xl" },
      });
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
        customClass: { popup: "rounded-xl" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performLogin(formData.email, formData.password);
  };

  const handleQuickLogin = (email, password) => {
    setFormData({ ...formData, email, password });
    performLogin(email, password);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const result = await loginWithGoogle();
      await updateUserProfile(result.user.displayName, result.user.photoURL);
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Signed in as ${result.user.displayName || result.user.email}`,
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "rounded-xl" },
      });
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
        customClass: { popup: "rounded-xl" },
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-26 px-4 bg-gray-50" id="login">
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
        <motion.h2
          className="text-3xl font-extrabold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Remember Me
            </label>
            <NavLink to="/register" className="text-blue-600 hover:underline text-sm font-medium">
              Create Account
            </NavLink>
          </div>

          {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? <FiLoader className="animate-spin" /> : <FiLogIn />}
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
          <p className="text-center text-xs font-semibold text-gray-500 uppercase">Quick Login</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {adminEmail && (
              <motion.button
                onClick={() => handleQuickLogin(adminEmail, adminPassword)}
                disabled={loading}
                className="flex-1 py-3 px-4 border border-blue-200 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition disabled:opacity-50 text-sm font-semibold"
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                <FiShield className="w-4 h-4" /> Login as Admin
              </motion.button>
            )}
            {customerEmail && (
              <motion.button
                onClick={() => handleQuickLogin(customerEmail, customerPassword)}
                disabled={loading}
                className="flex-1 py-3 px-4 border border-gray-200 bg-gray-50 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition disabled:opacity-50 text-sm font-semibold"
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                <FiUser className="w-4 h-4" /> Login as Customer
              </motion.button>
            )}
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <motion.button
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full py-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition disabled:opacity-50 text-gray-700 font-medium"
          whileHover={{ scale: googleLoading || loading ? 1 : 1.03 }}
          whileTap={{ scale: googleLoading || loading ? 1 : 0.98 }}
        >
          <FaGoogle className="w-5 h-5 text-red-500" />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </motion.button>
      </div>
    </section>
  );
}
