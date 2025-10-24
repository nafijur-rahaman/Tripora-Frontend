import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiUpload, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import {useApi} from "../../hooks/UseApi";
import useAuth from '../../hooks/UseAuth';
import Sweetalert from 'sweetalert2';



// Section Wrapper
const FormSection = ({ title, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            {title}
        </h2>
        <div className="space-y-6">{children}</div>
    </div>
);

// Input Component
const Input = ({ label, name, type = 'text', value, onChange, placeholder, icon }) => (
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
                className={`w-full py-3 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-200
                            ${icon ? 'pl-11 pr-4' : 'px-4'}`}
            />
        </div>
    </div>
);

// Textarea Component
const Textarea = ({ label, name, value, onChange, placeholder, rows = 4 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
        />
    </div>
);

// Select Component
const Select = ({ label, name, value, onChange, options }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
            {label}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);


const AddPackage = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('Beach'); 
    const [mainImage, setMainImage] = useState('');
    const [galleryImages, setGalleryImages] = useState(['', '', '']); 
    const [overview, setOverview] = useState('');
    const {post} = useApi();
    const {user} = useAuth();
    const userEmail = user?.email || 'tanjidnafis@gmail.com';

    // console.log('Authenticated User:', userEmail);

    const [itinerary, setItinerary] = useState([
        { day: 1, title: '', desc: '' }
    ]);


    const handleItineraryChange = (index, event) => {
        const values = [...itinerary];
        values[index][event.target.name] = event.target.value;
        setItinerary(values);
    };

    const addItineraryDay = () => {
        setItinerary([...itinerary, { day: itinerary.length + 1, title: '', desc: '' }]);
    };

    const removeItineraryDay = (index) => {
        const values = [...itinerary];
        values.splice(index, 1);
        const renumberedValues = values.map((item, i) => ({ ...item, day: i + 1 }));
        setItinerary(renumberedValues);
    };


    const handleGalleryImageChange = (index, event) => {
        const values = [...galleryImages];
        values[index] = event.target.value;
        setGalleryImages(values);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPackage = {
            title, location, price, duration, category, 
            images: [mainImage, ...galleryImages.filter(img => img !== '')],
            overview,
            itinerary,
            createdBy: userEmail,
        
        };
        const res = await post('/add-packages', newPackage);
        if(res.success){
            Sweetalert.fire({
                icon: 'success',
                title: 'Package Created',
                text: 'The new travel package has been successfully created.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });

            // Reset form
            setTitle('');
            setLocation('');
            setPrice('');
            setDuration('');
            setCategory('Beach');
            setMainImage('');
            setGalleryImages(['', '', '']);
            setOverview('');
            setItinerary([{ day: 1, title: '', desc: '' }]);
        }else{
            Sweetalert.fire({
                icon: 'error',
                title: 'Error',
                text: `${res.message || 'There was an error creating the package.'}`,
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        }
 
    };

    return (

        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Add New Package
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* --- Basic Information --- */}
                <FormSection title="Basic Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input 
                            label="Package Title" 
                            name="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g., Overwater Bungalow Retreat"
                        />
                        <Input 
                            label="Location" 
                            name="location" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            placeholder="e.g., Bora Bora, French Polynesia"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input 
                            label="Price (USD)" 
                            name="price" 
                            type="number"
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            placeholder="e.g., 2499"
                            icon={<FiDollarSign />}
                        />
                        <Input 
                            label="Duration" 
                            name="duration" 
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)} 
                            placeholder="e.g., 7 Days / 6 Nights"
                        />
                        <Select 
                            label="Category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={['Beach', 'Adventure', 'City', 'Cultural', 'Relaxation']}
                        />
                    </div>
                    <Textarea
                        label="Overview / Description"
                        name="overview"
                        value={overview}
                        onChange={(e) => setOverview(e.target.value)}
                        placeholder="Describe the package in detail..."
                        rows={5}
                    />
                </FormSection>

                {/* ---Image URLs --- */}
                <FormSection title="Package Images">
                    <p className="text-sm text-gray-500 -mt-4 mb-4">
                        Provide direct URLs for the package images (e.g., from Unsplash or your own CDN).
                    </p>
                    <Input 
                        label="Main Image URL" 
                        name="mainImage"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        icon={<FiUpload />}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {galleryImages.map((image, index) => (
                            <Input 
                                key={index}
                                label={`Gallery Image ${index + 1} URL`}
                                name={`galleryImage${index}`}
                                value={image}
                                onChange={(e) => handleGalleryImageChange(index, e)}
                                placeholder="https://..."
                            />
                        ))}
                    </div>
                </FormSection>


                <FormSection title="Itinerary Builder">
                    <div className="space-y-6">
                        {itinerary.map((day, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                                <h4 className="font-bold text-gray-800 mb-4">Day {day.day}</h4>
                                <div className="space-y-4">
                                    <Input 
                                        label="Title"
                                        name="title"
                                        value={day.title}
                                        onChange={(e) => handleItineraryChange(index, e)}
                                        placeholder="e.g., Arrival in Paradise"
                                    />
                                    <Textarea
                                        label="Description"
                                        name="desc"
                                        value={day.desc}
                                        onChange={(e) => handleItineraryChange(index, e)}
                                        placeholder="Describe the day's activities..."
                                        rows={3}
                                    />
                                </div>
                                {itinerary.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItineraryDay(index)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1"
                                        title="Remove Day"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <motion.button
                            type="button"
                            onClick={addItineraryDay}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 
                                       font-semibold rounded-lg hover:bg-blue-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FiPlus />
                            <span>Add Another Day</span>
                        </motion.button>
                    </div>
                </FormSection>

                {/* --- Submission Button --- */}
                <div className="flex justify-end pt-4">
                    <motion.button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white font-bold
                                   text-lg rounded-lg shadow-lg hover:bg-blue-700
                                   transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Create Package
                    </motion.button>
                </div>
            </form>
        </>
    );
};

export default AddPackage;