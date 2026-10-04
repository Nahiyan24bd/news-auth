"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // রিডাইরেক্ট ইউআরএল অথবা ফলব্যাক হিসেবে হোম পেজ ("/")
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
        setLoading(false);
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "সার্ভারে সমস্যা দেখা দিয়েছে। কিছুক্ষণ পর চেষ্টা করুন।";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-transparent">
        {/* শীর্ষ শিরোনাম */}
        <h1 className="text-3xl font-bold text-center text-[#b80000] mb-8">
          সাইন ইন
        </h1>

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="example@mail.com"
              required
              disabled={loading}
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors shadow-2xs disabled:bg-slate-100"
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700">
                পাসওয়ার্ড
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#b80000] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors shadow-2xs disabled:bg-slate-100"
            />
          </div>

          {/* সাইন ইন বাটন */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#b80000] hover:bg-[#990000] text-white font-bold rounded text-base transition-colors shadow-xs cursor-pointer flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "লগইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </div>
        </form>

        {/* সাইন আপ লিঙ্ক */}
        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
          নতুন ব্যবহারকারী?{" "}
          <Link
            href="/sign-up"
            className="text-[#b80000] hover:underline font-bold ml-1"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;