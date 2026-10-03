import Image from "next/image"
import { Button } from "@heroui/react";
import NavLinks from "./NavLinks";

const Header = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div>
            
<div className="relative flex items-center justify-end mx-auto max-w-7xl p-4">
  
  {/*  (Absolute Center) */}
  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
    <Image
      className="h-16 w-12 object-contain"
      src="/logo.webp"
      alt="Logo"
      width={48}
      height={64}
      priority
    />
    <div className="text-2xl font-bold">
      <h2 className="text-red-500">Bangla News 24</h2>
      <p className="text-sm font-medium text-slate-500">{date}</p>
    </div>
  </div>

  {/*  ডানপাশে সাইন ইন / সাইন আপ বাটন */}
   <div className="flex items-center gap-4 p-4">

                    <Button variant="outline">

                        সাইন ইন

                        </Button>

                    <Button variant="danger">

                        সাইন আপ

                        </Button>

                </div>

  </div>
           <NavLinks />

        </div>
    );
};

export default Header;