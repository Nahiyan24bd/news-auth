import Image from "next/image";
import Link from "next/link";
import { NewsCardItem } from "@/components/NewsCard";

interface MainNewsProps {
  news: NewsCardItem[];
}

const MainNews = ({ news }: MainNewsProps) => {
  // কোনো কারণে news না থাকলে যাতে পেজ ক্র্যাশ না করে
  if (!news || !Array.isArray(news) || news.length === 0) {
    return null;
  }

  const firstNews = news[0];
  const otherNews = news.slice(1, 6); // পরবর্তী ৫টি খবর

  if (!firstNews) return null;

  // তারিখ ফরম্যাট
  const publishTime = firstNews.firstPublished || firstNews.publishedAt;
  const formattedDate = publishTime
    ? new Date(publishTime).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "৩ অক্টোবর, ২০২৬ এ ১:৪৪ PM";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      {/* ================= ১. বাম পাশের আলাদা কার্ড (প্রধান খবর) ================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full">
        <div>
          <Link href={`/news/${firstNews.id || ""}`} className="group block">
            {/* ছবি */}
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-slate-100 mb-3.5">
              {firstNews.imageUrl ? (
                <Image
                  src={firstNews.imageUrl}
                  alt={firstNews.imageAlt || firstNews.title || "Main News Image"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                  ছবি নেই
                </div>
              )}
            </div>

            {/* লাল ক্যাটাগরি */}
            <span className="text-xs font-bold text-[#b80000] block mb-1.5">
              {firstNews.category || "প্রধান খবর"}
            </span>

            {/* লাল রঙের বড় শিরোনাম */}
            <h2 className="text-xl sm:text-[22px] font-bold leading-snug text-[#b80000] group-hover:underline transition-colors mb-2.5">
              {firstNews.title || ""}
            </h2>

            {/* বিবরণ */}
            {firstNews.description && (
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {firstNews.description}
              </p>
            )}
          </Link>
        </div>

        {/* তারিখ ও সময় */}
        {formattedDate && (
          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 mt-2">
            {formattedDate}
          </div>
        )}
      </div>

      {/* ================= ২. ডান পাশের সম্পূর্ণ আলাদা কার্ড (খবরের তালিকা) ================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full divide-y divide-slate-100">
        {otherNews.length > 0 ? (
          otherNews.map((item, idx) => (
            <Link
              key={item.id || idx}
              href={`/news/${item.id || ""}`}
              className="group py-3 first:pt-0 last:pb-0 flex flex-col justify-center flex-1 transition-colors"
            >
              <span className="text-[11px] font-bold text-[#b80000] block mb-1">
                {item.category || "প্রধান খবর"}
              </span>
              <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug group-hover:text-[#b80000] transition-colors line-clamp-2">
                {item.title || ""}
              </h3>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            অন্য কোনো প্রধান সংবাদ নেই
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNews;