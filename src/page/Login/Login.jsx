import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const { LoginUser, loginWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await LoginUser(formData.email, formData.password);
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Logged in as ${result.user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle();
      updateUserProfile(result.user.displayName, result.user.photoURL);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Signed in as ${result.user.displayName}`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section className="py-30 bg-gray-50" id="login">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl">
        {/* Title */}
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Remember me + Register link */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember Me
            </label>
            <NavLink
              to="/register"
              className="text-sky-500 hover:underline text-sm"
            >
              Create Account
            </NavLink>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Google login */}
        <div className="mt-6 space-y-3">
          <motion.button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/google.png" alt="Google" className="w-6 h-6" />
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
