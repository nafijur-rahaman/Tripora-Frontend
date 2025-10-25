import React from 'react';
import ImageGallery from './ImageGallery';
import BookingWidget from './BookingWidget';
import PackageInfoTabs from './PackageInfoTabs';

// --- Dummy Data (for a single package) ---
const packageData = {
    id: 1,
    location: 'Bora Bora, French Polynesia',
    title: 'Overwater Bungalow Retreat',
    price: 2499,
    rating: 4.9,
    reviewsCount: 82,
    duration: '7 Days / 6 Nights',
    images: [
        'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2575&auto=format&fit=crop', // Main image
        'https://images.unsplash.com/photo-1506041530507-9759c7f65113?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1573843981267-be199c614b62?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2522&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2574&auto=format&fit=crop'
    ],
    overview: 'Experience the pinnacle of tropical luxury in an overwater bungalow in Bora Bora. Wake up to the gentle sound of the lagoon, snorkel with vibrant marine life right from your private deck, and enjoy world-class service. This 7-day retreat is designed for ultimate relaxation and romance.',
    itinerary: [
        { day: 1, title: 'Arrival in Paradise', desc: 'Arrive at Bora Bora Airport and take a scenic boat transfer to your overwater bungalow.' },
        { day: 2, title: 'Lagoon Snorkeling Tour', desc: 'Explore the vibrant coral gardens and swim with sharks and rays in the crystal-clear lagoon.' },
        { day: 3, title: 'Relax & Spa Day', desc: 'Enjoy a day at leisure. Indulge in a traditional Polynesian spa treatment or relax on your deck.' },
        { day: 4, title: '4x4 Island Safari', desc: 'Discover the island\'s lush interior, panoramic viewpoints, and ancient marae sites on a guided 4x4 tour.' },
        { day: 5, title: 'Private Motu Picnic', desc: 'Take a private boat to a secluded motu (small islet) for a romantic beach picnic.' },
        { day: 6, title: 'Sunset Cruise', desc: 'Enjoy a breathtaking sunset cruise around the lagoon, complete with champagne and local snacks.' },
        { day: 7, title: 'Departure', desc: 'Enjoy a final breakfast over the lagoon before your boat transfer back to the airport.' }
    ],
    // ...reviewsData would be here...
};

const PackageDetailsPage = () => {
    // In a real app, you'd fetch this data based on a URL param
    const pkg = packageData; 

    return (
        <div className="pt-32 pb-24 bg-white"> {/* pt-32 to offset navbar */}
            <div className="container mx-auto px-6">
                
                {/* --- Package Title & Location --- */}
                <div className="mb-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
                        {pkg.title}
                    </h1>
                    <a href="#location" className="text-lg font-semibold text-blue-600 hover:underline">
                        {pkg.location}
                    </a>
                </div>

                {/* --- Image Gallery --- */}
                <ImageGallery images={pkg.images} />

                {/* --- Main Content Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                    
                    {/* Left Column (Info) */}
                    <div className="lg:col-span-2">
                        {/* Host Info (Example) */}
                        <div className="pb-8 border-b border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-800">
                                {pkg.duration} Package hosted by Tripora
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Rated <span className="font-bold">{pkg.rating} ★</span> ({pkg.reviewsCount} reviews)
                            </p>
                        </div>
                        
                        {/* Info Tabs */}
                        <PackageInfoTabs 
                            overview={pkg.overview}
                            itinerary={pkg.itinerary} 
                        />
                    </div>

                    {/* Right Column (Booking) */}
                    <aside className="lg:col-span-1">
                        {/* The sticky container */}
                        <div className="sticky top-32">
                            <BookingWidget 
                                price={pkg.price} 
                                rating={pkg.rating} 
                                reviewsCount={pkg.reviewsCount}
                            />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailsPage;