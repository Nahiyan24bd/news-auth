"use client";

import React, { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4 py-12">
      <div className="w-full max-w-md bg-transparent">
        {/* শীর্ষ শিরোনাম */}
        <h1 className="text-3xl font-bold text-center text-[#b80000] mb-8">
          সাইন আপ
        </h1>

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* নাম ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors shadow-2xs"
            />
          </div>

          {/* ইমেজ ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Image
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors shadow-2xs"
            />
          </div>

          {/* ইমেইল ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors shadow-2xs"
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors shadow-2xs"
            />
          </div>

          {/* সাইন আপ বাটন */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#b80000] hover:bg-[#990000] text-white font-bold rounded text-base transition-colors shadow-xs cursor-pointer flex items-center justify-center"
            >
              সাইন আপ করুন
            </button>
          </div>
        </form>

        {/* সাইন ইন লিঙ্ক */}
        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-[#b80000] hover:underline font-bold ml-1"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;