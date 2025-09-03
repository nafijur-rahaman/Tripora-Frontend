import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext";

const categories = ["All", "Beach", "Mountain", "Adventure", "City"];

export default function ManageMyPackages() {

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPackage, setEditingPackage] = useState(null);

  const token = localStorage.getItem("token");


useEffect(() => {
  if (!userEmail) return;

  const fetchUserPackages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/get_user_packages/?userEmail=${userEmail}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPackages(res.data.data || []);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch your packages.");
    } finally {
      setLoading(false);
    }
  };

  fetchUserPackages();
}, [userEmail, token]);




  //  Delete a package
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete_package/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete the package.");
    }
  };



  //  Update a package
  const handleSave = async (updatedPackage) => {
    try {
      await axios.put(
        `http://localhost:3000/api/update_package/${updatedPackage._id}`,
        updatedPackage,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg._id === updatedPackage._id ? updatedPackage : pkg
        )
      );
      setEditingPackage(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update the package.");
    }
  };



  //  Filter packages
  const filteredPackages = packages.filter(
    (pkg) =>
      (activeCategory === "All" || pkg.category === activeCategory) &&
      pkg.tour_name.toLowerCase().includes(searchTerm.toLowerCase())
  );




  return (
    <section className="py-30 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Manage My Packages
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
          />
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10 flex-wrap gap-3">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading / Error / No Data */}
        {loading && (
          <p className="text-center text-gray-500">Loading packages...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && filteredPackages.length === 0 && (
          <p className="text-center text-gray-500">No packages found.</p>
        )}

        {/* Packages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <img
                  src={pkg.image}
                  alt={pkg.tour_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {pkg.tour_name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Duration: {pkg.duration}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Departure: {pkg.departure_location}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Departure Date: {pkg.departure_date}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ${pkg.price}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {pkg.package_details}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setEditingPackage(pkg)}
                      className="flex-1 py-2 bg-gradient-to-r bg-sky-500 hover:bg-sky-600 cursor-pointer text-white font-semibold rounded-xl transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold rounded-xl transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingPackage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Edit Package
              </h3>
              <div className="grid gap-4">
                <input
                  type="text"
                  value={editingPackage.tour_name}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      tour_name: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                  placeholder="Tour Name"
                />
                <input
                  type="text"
                  value={editingPackage.duration}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      duration: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                  placeholder="Duration"
                />
                <input
                  type="text"
                  value={editingPackage.departure_location}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      departure_location: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                  placeholder="Departure Location"
                />
                <input
                  type="date"
                  value={editingPackage.departure_date}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      departure_date: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="number"
                  value={editingPackage.price}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      price: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                  placeholder="Price"
                />
                <textarea
                  value={editingPackage.package_details}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      package_details: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                  placeholder="Package Details"
                  rows={4}
                />
                <select
                  value={editingPackage.category}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      category: e.target.value,
                    })
                  }
                  className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
                >
                  <option>Beach</option>
                  <option>Mountain</option>
                  <option>Adventure</option>
                  <option>City</option>
                </select>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleSave(editingPackage)}
                  className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white font-semibold rounded-xl transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPackage(null)}
                  className="flex-1 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
