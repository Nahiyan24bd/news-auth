import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import UserInFo from "./UserInFo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* উপরের বার: ৩ কলাম গ্রিড যাতে লোগো হুবহু সেন্টারে থাকে এবং বাটন ডানে থাকে */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          {/* বাঁকলাম (ডেস্কটপে খালি বা অতিরিক্ত টেক্সট) */}
          <div className="hidden md:block"></div>

          {/* মাঝখানের কলাম: লোগো ও নাম */}
          <div className="flex items-center justify-center gap-3 text-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                className="h-12 w-10 md:h-14 md:w-12 object-contain"
                src="/logo.webp"
                alt="Logo"
                width={48}
                height={56}
                priority
              />
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#b80000] tracking-tight">
                  Bangla News 24
                </h2>
                <p className="text-xs font-medium text-slate-500">{date}</p>
              </div>
            </Link>
          </div>

          {/* ডান কলাম: সাইন ইন ও সাইন আপ বাটন */}
          <div className="flex items-center justify-center md:justify-end">
            <UserInFo />
          </div>
        </div>
      </div>

      {/* ক্যাটাগরি মেনু বার */}
      <NavLinks />

      {/* ব্রেকিং নিউজ মারকুই বার */}
      <Marquee />
    </header>
  );
};

export default Header;