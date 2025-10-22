import React from 'react';
import Hero from '../../components/Hero/Hero';
import JourneySection from '../../components/JourneySection/JourneySection';
import TeamSection from '../../components/TeamSection/TeamSection';
import Testimonials from '../../components/Testimonials/Testimonilas';
import JourneyTimeline from '../../components/JourneyTimeline/JourneyTimeline';
import TourShowcase from '../../components/TourShowcase/TourShowcase';
import PopularDestinations from '../../components/PopularDestinations/PopularDestinations';
import TravelInspiration from '../../components/TravelInspiration/TravelInspiration';


const Home = () => {
    return (
        <div>
         <Hero></Hero>
         <PopularDestinations></PopularDestinations>
         <JourneySection></JourneySection>
         <TravelInspiration></TravelInspiration>
         {/* <JourneyTimeline></JourneyTimeline> */}
         <TourShowcase></TourShowcase>
         <Testimonials></Testimonials>
        </div>
    );
};

export default Home;