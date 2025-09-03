import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

export default function Register() {
  const { RegisterUser, updateUserProfile, loginWithGoogle } =
    useContext(AuthContext);

  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Real-time validation
  const validateFields = (name, value) => {
    let newError = { ...error };
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      newError.email = "Invalid email format";
    } else if (name === "password" && value && value.length < 6) {
      newError.password = "Password must be at least 6 characters";
    } else if (name === "confirmPassword" && value !== formData.password) {
      newError.confirmPassword = "Passwords do not match";
    } else {
      delete newError[name];
    }
    setError(newError);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateFields(name, value);
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(error).length > 0) {
      Swal.fire("Error", "Please fix the errors before submitting", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError({ ...error, confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const result   = await RegisterUser(
        formData.email,
        formData.password
      );
      await updateUserProfile(formData.fullName, formData.photo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome, ${formData.fullName}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        fullName: "",
        email: "",
        photo: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Signed in as ${result.user.displayName}`,
        timer: 2000,
        showConfirmButton: false,
      });
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
    <section className="py-30 bg-gray-50" id="register">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create Your Account
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className={`w-full p-3 rounded-xl border ${
              error.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-sky-500 transition`}
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

          {/* Photo URL */}
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className={`w-full p-3 rounded-xl border ${
              error.password ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-sky-500 transition`}
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className={`w-full p-3 rounded-xl border ${
              error.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-sky-500 transition`}
          />
          {error.confirmPassword && (
            <p className="text-red-500 text-sm">{error.confirmPassword}</p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Google Login */}
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
