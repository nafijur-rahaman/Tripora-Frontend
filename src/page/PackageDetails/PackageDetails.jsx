import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import BookingWidget from "./BookingWidget";
import PackageInfoTabs from "./PackageInfoTabs";
import {useApi} from '../../hooks/UseApi';
import useAuth from "../../hooks/UseAuth";
import { useParams } from "react-router";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


// Replace with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);



const PackageDetailsPage = () => {
  const [packageData, setPackageData] = useState([]);
  const { id } = useParams();
  const {loading} = useAuth();
  const {get} = useApi();
  const options = {
    appearance: {theme: 'stripe' },
  }

  useEffect(() => {
    const fetchPackageData = async () => {
        if (loading) return;
      try {
        const response = await get(`get-package/${id}`);
        setPackageData(response?.data || []);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };
    fetchPackageData();
  }, [loading]);
 
 const pkg = packageData;

//  console.log(pkg);

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        {/* --- Package Title & Location --- */}
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            {pkg?.title}
          </h1>
          <a
            href="#location"
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {pkg?.location}
          </a>
        </div>

        {/* --- Image Gallery --- */}
        <ImageGallery images={pkg?.images || []} />

        {/* --- Main Content Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Left Column (Info) */}
          <div className="lg:col-span-2">
            {/* Host Info (Example) */}
            <div className="pb-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800">
                {pkg?.duration} Package hosted by Tripora
              </h2>
              <p className="text-gray-600 mt-2">
                Rated <span className="font-bold">{pkg?.rating} ★</span> (
                {pkg?.reviewCount} reviews)
              </p>
            </div>

            {/* Info Tabs */}
            <PackageInfoTabs
              overview={pkg?.overview}
              itinerary={pkg?.itinerary || []}
            />
          </div>

          {/* Right Column (Booking) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-32">
                            {/* --- Wrap BookingWidget with Elements --- */}
                            <Elements stripe={stripePromise} options={options}>
                                <BookingWidget 
                                    price={pkg.price} 
                                    rating={pkg.rating} 
                                    reviewsCount={pkg.reviewCount}
                                    // Pass necessary data for payment API call
                                    packageId={pkg._id} 
                                    packageName={pkg.title}
                                    customerEmail={'customer@example.com'} // Get this from auth context
                                />
                            </Elements>
                        </div>
                    </aside>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
