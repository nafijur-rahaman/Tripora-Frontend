import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import BookingWidget from "./BookingWidget";
import PackageInfoTabs from "./PackageInfoTabs";
import {useApi} from '../../hooks/UseApi';
import useAuth from "../../hooks/UseAuth";
import { useParams } from "react-router";



const PackageDetailsPage = () => {
  const [packageData, setPackageData] = useState([]);
  const { id } = useParams();
  const {loading} = useAuth();
  const {get} = useApi();

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

 console.log(pkg);

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
                {pkg?.reviewsCount} reviews)
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
            {/* The sticky container */}
            <div className="sticky top-32">
              <BookingWidget
                price={pkg?.price}
                rating={pkg?.rating}
                reviewsCount={pkg?.reviewsCount}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
