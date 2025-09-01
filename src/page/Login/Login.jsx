import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    alert(`Logged in as: ${formData.email}`);
  };

  return (
    <section className="py-16 bg-gray-50" id="login">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
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
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
              Remember Me
            </label>
            <a href="#register" className="text-sky-500 hover:underline text-sm">Create Account</a>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            type="submit"
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* Social Login Buttons with animation */}
        <div className="mt-6 space-y-3">
          <motion.button
            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/google.svg" alt="Google" className="w-6 h-6" />
            Continue with Google
          </motion.button>

          <motion.button
            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
            Continue with Facebook
          </motion.button>
        </div>
      </div>
    </section>
  );
}
