import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiLock, FiUpload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/UseAuth'; 
import { useApi } from '../../hooks/UseApi';   


const FormSection = ({ title, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            {title}
        </h2>
        <div className="space-y-6">{children}</div>
    </div>
);

const Input = ({ label, name, type = 'text', value, onChange, placeholder, icon, disabled = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    {React.cloneElement(icon, { className: 'w-5 h-5 text-gray-400' })}
                </div>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-200
                            ${icon ? 'pl-11 pr-4' : 'px-4'}
                            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
            />
        </div>
    </div>
);


const CustomerProfile = () => {
    const { user, loading: authLoading, updateUserProfile } = useAuth(); 
    const { post } = useApi(); 

    // --- State for Profile Info ---
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(''); 

    // --- State for Password Change ---
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // --- State for Feedback ---
    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    // --- Load User Data ---
    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setEmail(user.email || '');
            setAvatar(user.photoURL || 'default-avatar.png'); 
        }
    }, [user]);

    // --- Handlers ---
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileMessage({ type: '', text: '' }); 
        if (!user) return;

        try {

            await updateUserProfile({ displayName: name });



            setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            console.error("Profile update error:", error);
            setProfileMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' }); 
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: "New passwords don't match!" });
            return;
        }
        if (!newPassword || newPassword.length < 6) { 
             setPasswordMessage({ type: 'error', text: "Password must be at least 6 characters." });
            return;
        }

        try {


            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Password change error:", error);
            setPasswordMessage({ type: 'error', text: error.message || 'Failed to change password.' });
        }
    };

    if (authLoading) {
        return <div className="p-12 text-center">Loading profile...</div>;
    }

    if (!user) {
         return <div className="p-12 text-center">Please log in to view your profile.</div>;
    }


    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                My Profile
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* --- Left Column: Profile Card --- */}
                <div className="lg:col-span-2">
                    <FormSection title="Personal Information">
                        <form onSubmit={handleProfileSubmit} className="space-y-6">

                            <div className="flex items-center space-x-6">
                                <img
                                    src={avatar}
                                    alt="Profile Avatar"
                                    className="w-24 h-24 rounded-full object-cover shadow-md bg-gray-200" 
                                />
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
                                disabled={true} 
                            />

                            {profileMessage.text && (
                                <p className={`text-sm font-medium ${profileMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                    {profileMessage.text}
                                </p>
                            )}

                            <div className="flex justify-end pt-4">
                                <motion.button
                                    type="submit"
                                    className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Save Changes
                                </motion.button>
                            </div>
                        </form>
                    </FormSection>
                </div>


                <div className="lg:col-span-1">
                    <FormSection title="Change Password">
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


                            {passwordMessage.text && (
                                <p className={`text-sm font-medium ${passwordMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                    {passwordMessage.text}
                                </p>
                            )}

                            <div className="flex justify-end pt-4">
                                <motion.button
                                    type="submit"
                                    className="w-full px-8 py-3 bg-gray-700 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
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

export default CustomerProfile;