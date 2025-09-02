import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export default function AddPackage() {
  const [packageData, setPackageData] = useState({
    tour_name: '',
    image: '',
    duration: '',
    departure_location: '',
    destination: '',
    price: '',
    departure_date: '',
    package_details: '',
    guide_contact_no: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useContext(AuthContext);
  const guide_name = user?.displayName;
  const guide_email = user?.email;
  const guide_photo = user?.photoURL;

  const handleChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...packageData,
        guide_name,
        guide_email,
        guide_photo,
      };

      console.log(payload);

      const res = await axios.post('http://localhost:3000/api/create_package/', payload);

      if (res.data.success) {
        setSuccess('Package created successfully!');
        setPackageData({
          tour_name: '',
          image: '',
          duration: '',
          departure_location: '',
          destination: '',
          price: '',
          departure_date: '',
          package_details: '',
          guide_contact_no: '',
          category: '',
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-30">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Add New Package</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl space-y-6"
      >
        {/* Feedback Messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {/* First Row: Tour Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="tour_name"
            value={packageData.tour_name}
            onChange={handleChange}
            placeholder="Tour Name"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />

          <select
            name="category"
            value={packageData.category}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>

        {/* Second Row: Image & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="image"
            value={packageData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />
          <input
            type="text"
            name="duration"
            value={packageData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g., 7 Days / 6 Nights)"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />
        </div>

        {/* Third Row: Departure Location & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="departure_location"
            value={packageData.departure_location}
            onChange={handleChange}
            placeholder="Departure Location"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />
          <input
            type="text"
            name="destination"
            value={packageData.destination}
            onChange={handleChange}
            placeholder="Destination"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />
        </div>

        {/* Fourth Row: Price & Departure Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            placeholder="Price (e.g., 1200)"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />
          <input
            type="date"
            name="departure_date"
            value={packageData.departure_date}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
            required
          />
        </div>

        {/* Fifth Row: Contact Number */}
        <input
          type="text"
          name="guide_contact_no"
          value={packageData.guide_contact_no}
          onChange={handleChange}
          placeholder="Contact Number"
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
          required
        />

        {/* Package Details */}
        <textarea
          name="package_details"
          value={packageData.package_details}
          onChange={handleChange}
          placeholder="Package Details"
          className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 w-full"
          rows={4}
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-xl transition ${
            loading ? 'bg-gray-400' : 'bg-[#00AEEF] hover:bg-sky-600'
          }`}
        >
          {loading ? 'Submitting...' : 'Add Package'}
        </button>
      </form>

      {/* Preview Section */}
      {packageData.tour_name && (
        <div className="mt-12 w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{packageData.tour_name}</h3>
          <img
            src={packageData.image}
            alt={packageData.tour_name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 mb-1">Category: {packageData.category}</p>
          <p className="text-gray-600 mb-1">Duration: {packageData.duration}</p>
          <p className="text-gray-600 mb-1">Departure: {packageData.departure_location}</p>
          <p className="text-gray-600 mb-1">Destination: {packageData.destination}</p>
          <p className="text-gray-800 font-bold mb-2">Price: {packageData.price}</p>
          <p className="text-gray-600 mb-1">Departure Date: {packageData.departure_date}</p>
          <p className="text-gray-700">{packageData.package_details}</p>
          <p className="text-gray-600 mb-1">Contact: {packageData.guide_contact_no}</p>
          <p className="text-gray-600 mb-1">Guide: {guide_name}</p>
        </div>
      )}
    </div>
  );
}
