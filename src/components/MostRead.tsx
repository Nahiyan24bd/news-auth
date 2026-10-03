import Link from "next/link";

interface NewsItem {
  id?: string | number;
  _id?: string | number;
  title: string;
  url?: string;
}

const MostRead = async () => {
  let mostRead: NewsItem[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read", {
      next: { revalidate: 300 }, // প্রতি ৫ মিনিট পর ক্যাশ আপডেট
    });

    if (res.ok) {
      const data = await res.json();
      mostRead = data.data ?? [];
    }
  } catch (error) {
    console.error("Error fetching most-read news:", error);
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* শিরোনাম */}
      <h3 className="mb-5 text-xl font-extrabold text-slate-900">
        সর্বাধিক পঠিত
      </h3>

      {/* সংবাদের তালিকা */}
      <div className="space-y-4">
        {mostRead.slice(0, 10).map((news, index) => (
          <Link
            key={news.id ?? news._id ?? index}
            href={news.url ?? `/news/${news.id ?? news._id ?? "#"}`}
            className="group flex items-start gap-4 transition-colors"
          >
            {/* সিরিয়াল নম্বর (বড় ও লাল রঙের) */}
            <span className="min-w-6 font-serif font-bold leading-tight text-red-700">
              {index + 1}
            </span>

            {/* নিউজের শিরোনাম */}
            <p className="text-sm font-semibold leading-relaxed text-slate-800 transition-colors duration-200 group-hover:text-red-600">
              {news.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;