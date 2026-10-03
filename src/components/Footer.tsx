import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const categories = [
    { name: 'বাংলাদেশ', href: '/category/bangladesh' },
    { name: 'আন্তর্জাতিক', href: '/category/international' },
    { name: 'রাজনীতি', href: '/category/politics' },
    { name: 'অর্থনীতি', href: '/category/economy' },
    { name: 'খেলা', href: '/category/sports' },
    { name: 'বিজ্ঞান ও প্রযুক্তি', href: '/category/technology' },
    { name: 'বিনোদন', href: '/category/entertainment' },
    { name: 'জীবনযাপন', href: '/category/lifestyle' },
  ];

  const quickLinks = [
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'যোগাযোগ', href: '/contact' },
    { name: 'গোপনীয়তা নীতি', href: '/privacy' },
    { name: 'ব্যবহারের শর্তাবলী', href: '/terms' },
    { name: 'বিজ্ঞাপন', href: '/advertise' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t-4 border-[#b80000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* টপ সেকশন: ব্র্যান্ডিং ও বিবরণ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* লোগো ও পোর্টাল বিবরণী */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                সংবাদ <span className="text-[#b80000]">২৪</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              সত্য ও বস্তুনিষ্ঠ সংবাদের বিশ্বস্ত প্ল্যাটফর্ম। ২৪ ঘণ্টা দেশ ও বিদেশের সর্বশেষ খবর এবং বিশ্লেষণ তুলে ধরাই আমাদের অঙ্গীকার।
            </p>
          </div>

          {/* প্রধান বিভাগসমূহ (ক্যাটাগরি) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-l-2 border-[#b80000] pl-2">
              বিভাগসমূহ
            </h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* দ্রুত লিংক ও সম্পাদকীয় */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 border-l-2 border-[#b80000] pl-2">
              প্রয়োজনীয় তথ্য
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:underline transition-colors block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* বটম সেকশন: কপিরাইট ও লিগ্যাল নোটিশ */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            © ২০২৬ সর্বস্বত্ব সংরক্ষিত | সংবাদ ২৪
          </p>
          <p className="text-slate-400">
            কর্তৃপক্ষের অনুমতি ছাড়া এই পোর্টালের কোনো লেখা বা ছবি ব্যবহার করা সম্পূর্ণ বেআইনি।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;