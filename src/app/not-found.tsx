import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* 404 বড় হেডিং */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-[#b80000] tracking-widest">
        ৪০৪
      </h1>

      <div className="bg-[#b80000] text-white text-xs md:text-sm px-3 py-1 rounded rotate-12 absolute mb-16 font-semibold">
        পৃষ্ঠাটি পাওয়া যায়নি
      </div>

      {/* বিবরণ */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-6 mb-2">
        দুঃখিত! এই পাতাটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="text-slate-500 max-w-md text-sm md:text-base mb-8">
        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়ে থাকতে পারে, নাম পরিবর্তন করা হয়েছে
        অথবা সাময়িকভাবে অনুপলব্ধ।
      </p>

      {/* হোমপেজে ফেরার বাটন */}
      <Link
        href="/"
        className="px-6 py-3 bg-[#b80000] hover:bg-[#990000] text-white font-semibold rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        প্রচ্ছদে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;