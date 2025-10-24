import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../../hooks/UseAuth";
import Loading from "../../components/Loader/Loader";


const FormSection = ({ title, children }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {React.cloneElement(icon, { className: "w-5 h-5 text-gray-400" })}
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full py-3 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${icon ? "pl-11 pr-4" : "px-4"}
          ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
        `}
      />
    </div>
  </div>
);

const ProfilePage = () => {
  const { user, loading, updateUserProfile } = useAuth();

  // Initialize empty — then sync with user once loaded
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync user data after it's loaded
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      setAvatar(
        user.photoURL ||
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574"
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  // --- Avatar Upload ---
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    try {
      setIsUpdating(true);
      await updateUserProfile({ displayName: name, photoURL: avatar });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile!");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Changing password...");
    alert("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-2">
          <FormSection title="Personal Information">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="flex items-center space-x-6">
                <img
                  src={avatar}
                  alt="Profile Avatar"
                  className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-200"
                />
                <div>
                  <label
                    htmlFor="avatarUpload"
                    className="cursor-pointer px-5 py-2.5 bg-blue-100 text-blue-700
                      font-semibold rounded-lg hover:bg-blue-200 transition-colors flex items-center"
                  >
                    <FiUpload className="w-4 h-4 mr-2" />
                    Upload New Photo
                  </label>
                  <input
                    type="file"
                    id="avatarUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, or GIF up to 10MB.
                  </p>
                </div>
              </div>

              <Input
                label="Full Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<FiUser />}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={email}
                icon={<FiMail />}
                disabled
              />

              <div className="flex justify-end pt-4">
                <motion.button
                  type="submit"
                  disabled={isUpdating}
                  className="px-8 py-3 bg-blue-600 text-white font-bold
                    text-lg rounded-lg shadow-lg hover:bg-blue-700
                    transition-colors duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </motion.button>
              </div>
            </form>
          </FormSection>
        </div>

        {/* Right Column: Security */}
        <div className="lg:col-span-1">
          <FormSection title="Security">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <Input
                label="Current Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                icon={<FiLock />}
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<FiLock />}
              />
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<FiLock />}
              />

              <div className="flex justify-end pt-4">
                <motion.button
                  type="submit"
                  className="w-full px-8 py-3 bg-gray-700 text-white font-bold
                    text-lg rounded-lg shadow-lg hover:bg-gray-800
                    transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Password
                </motion.button>
              </div>
            </form>
          </FormSection>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
