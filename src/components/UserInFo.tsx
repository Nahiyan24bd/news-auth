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
        <span className="text-sm font-semibold text-slate-700">
          {session.user.name}
        </span>
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