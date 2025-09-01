import React from "react";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/bg_4.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Explore the World with Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow">
          Discover breathtaking destinations, plan your perfect trip, and book
          with ease — all in one place.
        </p>
        <div className="flex gap-3">
          <a
            href="#destinations"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 transition rounded-xl font-semibold shadow-lg"
          >
            Explore Destinations
          </a>
          <a
            href="#deals"
            className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-200 transition rounded-xl font-semibold shadow-lg"
          >
            View Deals
          </a>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent"></div> */}
    </section>
  );
}
