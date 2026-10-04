"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; // আপনার authClient ফাইলটির সঠিক পাথ দিন

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // data ব্যবহার না করায় শুধু error নেওয়া হয়েছে
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
        setLoading(false);
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (err: unknown) { // any এর বদলে unknown ব্যবহার করুন
      const message =
        err instanceof Error ? err.message : "সার্ভার এরর! কিছুক্ষণ পর চেষ্টা করুন।";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-md bg-transparent">
        <h1 className="text-3xl font-bold text-center text-[#b80000] mb-8">
          সাইন আপ
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              disabled={loading}
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
            />
          </div>

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
              disabled={loading}
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
            />
          </div>

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
              disabled={loading}
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
            />
          </div>

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
              disabled={loading}
              className="w-full h-11 px-3.5 rounded border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#b80000] hover:bg-[#990000] text-white font-bold rounded text-base transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
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