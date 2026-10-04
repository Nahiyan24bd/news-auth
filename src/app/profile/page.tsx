"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface UserType {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as UserType | undefined;

  // সেশন লোড হওয়ার স্টেট
  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#b80000] rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-sm">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  // ইউজার লগইন না থাকলে মেসেজ ও সাইন-ইন বাটন
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-600 font-semibold text-lg text-center">
          প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে লগইন করুন।
        </p>
        <Link
          href="/sign-in?callbackUrl=/profile"
          className="px-6 py-2.5 bg-[#b80000] hover:bg-[#990000] text-white font-medium rounded-lg text-sm transition-colors shadow-xs"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return <ProfileContent user={user} key={user.id} />;
};

const ProfileContent = ({ user }: { user: UserType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    image: user.image || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image || undefined,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে!");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      setIsEditing(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "সার্ভার এরর! কিছুক্ষণ পর চেষ্টা করুন।";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:py-10">
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 md:p-8">
        {/* প্রোফাইল হেডার ও টগল বাটন */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#b80000] ring-offset-2 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  formData.image ||
                  user.image ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
                alt={user.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                {formData.name || user.name}
              </h1>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          {/* এডিট / বাতিল টগল বাটন */}
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                setFormData({
                  name: user.name || "",
                  image: user.image || "",
                });
              }
              setIsEditing(!isEditing);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer border ${
              isEditing
                ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "border-[#b80000] text-[#b80000] hover:bg-red-50"
            }`}
          >
            {isEditing ? "বাতিল করুন" : "এডিট করুন"}
          </button>
        </div>

        {/* এডিট ফর্ম (টগল ট্রু হলে দেখাবে) */}
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-5 mt-6">
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
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                ছবির লিঙ্ক (Image URL)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                disabled={loading}
                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-colors disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 h-11 bg-[#b80000] hover:bg-[#990000] text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => setIsEditing(false)}
                className="px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-sm transition-colors cursor-pointer"
              >
                বাতিল
              </button>
            </div>
          </form>
        ) : (
          /* সাধারণ ভিউ মোড */
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                ব্যবহারকারীর নাম
              </span>
              <p className="text-base font-semibold text-slate-800 mt-0.5">
                {formData.name || user.name}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                ইমেইল ঠিকানা
              </span>
              <p className="text-base font-semibold text-slate-800 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;