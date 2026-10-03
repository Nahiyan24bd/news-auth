import Image from "next/image";
import { Button } from "@heroui/react";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import Link from "next/link";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // sticky top-0 z-50 যোগ করায় এটি স্ক্রোলে ফিক্সড থাকবে
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      <div className="relative flex flex-col md:flex-row items-center justify-between md:justify-end mx-auto max-w-7xl p-4 gap-4">
        {/* লোগো ও তারিখ */}
        <div className="flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center gap-2 text-center md:text-left">
          <Image
            className="h-14 w-11 md:h-16 md:w-12 object-contain"
            src="/logo.webp"
            alt="Logo"
            width={48}
            height={64}
            priority
          />
          <div className="text-xl md:text-2xl font-bold">
            <h2 className="text-red-500">Bangla News 24</h2>
            <p className="text-xs md:text-sm font-medium text-slate-500">{date}</p>
          </div>
        </div>

        {/* ডানপাশে সাইন ইন / সাইন আপ বাটন */}
        <div className="flex items-center gap-3 md:gap-4">
  <Link href="/sign-in">
    <Button variant="outline">সাইন ইন</Button>
  </Link>
  <Link href="/sign-up">
    <Button variant="danger">সাইন আপ</Button>
  </Link>
</div>
      </div>

      <NavLinks />
      <Marquee />
    </header>
    
  );
};

export default Header;