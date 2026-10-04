"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInFo = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  // লগইন করা থাকলে ইউজারের নাম ও লগআউট বাটন
  if (session?.user) {
    return (
  <div className="flex items-center gap-3">
    {/* অ্যাভাটার কম্পোনেন্ট */}
<div className="avatar">
  <div className="w-9 h-9 rounded-full ring-2 ring-red-500 ring-offset-2 ring-offset-base-100 overflow-hidden">
    <Link href="/profile">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          session.user.image ||
          "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
        }
        alt={session.user.name || "User Avatar"}
        className="w-full h-full object-cover"
      />
    </Link>
  </div>
</div>

    {/* ওয়েলকাম মেসেজ */}
    <span className="text-sm font-semibold text-slate-700">
      Welcome, <span className="text-green-600 font-bold">{session.user.name}</span>
    </span>

    {/* লগআউট বাটন */}
    <Button
      size="sm"
      variant="danger-soft"
      onClick={async () => {
        await authClient.signOut();
        window.location.reload();
      }}
    >
      লগআউট
    </Button>
  </div>
);
  }

  // লগইন না থাকলে সাইন ইন / সাইন আপ বাটন
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Link href="/sign-in">
        <Button size="sm" variant="outline" className="font-semibold text-slate-700">
          সাইন ইন
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button size="sm" variant="danger" className="font-semibold">
          সাইন আপ
        </Button>
      </Link>
    </div>
  );
};

export default UserInFo;