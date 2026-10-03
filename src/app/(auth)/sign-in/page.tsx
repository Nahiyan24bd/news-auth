"use client";

import React, { useState } from "react";
import Link from "next/link";

const SignIn = () => {
  const [formData, setFormData] = useState({
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
    console.log("Sign In Data:", formData);
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-md px-4">
        {/* শিরোনাম */}
        <h1 className="text-2xl font-bold text-center text-[#b80000] mb-6">
          সাইন ইন
        </h1>

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-800 mb-1">ইমেইল</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 border border-slate-300 rounded focus:outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm text-slate-800">পাসওয়ার্ড</label>
              <Link
                href="/forgot-password"
                className="text-xs text-slate-500 hover:text-[#b80000]"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 border border-slate-300 rounded focus:outline-none focus:border-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-[#b80000] text-white font-medium rounded hover:bg-[#a00000] transition-colors"
          >
            সাইন ইন করুন
          </button>
        </form>

        <p className="text-center text-sm text-slate-700 mt-5">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="text-[#b80000] hover:underline font-semibold">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;