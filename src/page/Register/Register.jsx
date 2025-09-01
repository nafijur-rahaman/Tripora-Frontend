import React, { use, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Context/AuthContext';

export default function Register() {
  const {RegisterUser} = use(AuthContext);
  console.log(RegisterUser);

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    photo: '',
    password: '',
    confirmPassword: '',
    role: 'Traveler',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    alert(`Registered as ${formData.role}: ${formData.fullName}`);
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '', role: 'Traveler' });
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />
          <input
            type = "text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500 transition"
          >
            <option>Traveler</option>
            <option>Guide</option>
            <option>Admin</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            type="submit"
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>

        {/* Social Login Buttons*/}
        <div className="mt-6 space-y-3">
          <motion.button
            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/google.png" alt="Google" className="w-6 h-6" />
            Continue with Google
          </motion.button>

        </div>
      </div>
    </section>
  );
}
