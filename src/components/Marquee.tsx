import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headline {
  id: string;
  title: string;
  url?: string;
  category?: string;
  topicId?: string | null;
  scrapable?: boolean;
}

const Marquee = async () => {
  let headlines: Headline[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=15", {
      next: { revalidate: 60 }, // প্রতি ৬০ সেকেন্ড পর স্বয়ংক্রিয় রিভ্যালিডেশন
    });

    if (res.ok) {
      const data = await res.json();
      headlines = data?.data ?? [];
    }
  } catch (error) {
    console.error("Marquee headlines fetch failed:", error);
  }

  // শিরোনাম না থাকলে কম্পোনেন্ট রেন্ডার হবে না
  if (!headlines.length) return null;

  return (
    <div className="bg-[#b80000] text-white border-b border-red-800 shadow-xs">
      <div className="flex items-center max-w-7xl mx-auto sm:px-4">
        {/* 'সর্বশেষ' ব্যাজ (মোবাইলে সংকুচিত হওয়া রোধ করতে shrink-0) */}
        <div className="bg-red-900 text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 shrink-0 flex items-center gap-1.5 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-bold text-lg">সর্বশেষ</span>
        </div>

        {/* স্ক্রলিং টেক্সট কন্টেইনার */}
        <div className="flex-1 overflow-hidden py-1 sm:py-1.5 pl-2 sm:pl-4 text-xs sm:text-sm font-medium">
          <MarqueeText direction="right" duration={10} >
            {headlines.map((h) => (
              <span key={h.id} className="inline-flex items-center">
                <Link
                  href={`/news/${h.id}`}
                  className="flex items-center gap-5 font-bold text-lg hover:underline transition-all text-white/95 hover:text-white"
                >
                    
                  {h.title}
                </Link>
                <span className="mx-3 sm:mx-6 text-white text-1xl font-bold">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;