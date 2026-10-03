import MainNews from "@/components/MainNews";
import NewsCard, { NewsCardItem } from "@/components/NewsCard";
import MostRead from "@/components/MostRead";

interface Section {
  curationId: string;
  title: string;
  category: string;
  articles: NewsCardItem[];
}

export default async function Home() {
  let sections: Section[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const data = await res.json();
      sections = data?.data ?? [];
    }
  } catch (error) {
    console.error("Home page fetch error:", error);
  }

  const mainNews = sections[0]?.articles ?? [];
  const otherNews = sections.slice(1);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4 sm:p-6">
        {/* বাম পাশের মূল অংশ (মেইন নিউজ + অন্যান্য ক্যাটাগরি) */}
        <div className="lg:col-span-2 space-y-10">
          {mainNews.length > 0 && <MainNews news={mainNews} />}

          {otherNews.length > 0 && (
            <div className="space-y-10">
              {otherNews.map((section) => (
                <div key={section.curationId} className="pt-2">
                  <div className="border-b-2 border-red-600 pb-2 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {section.title || section.category}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {section.articles.map((news, idx) => (
                      <NewsCard
                        key={news.id || `${section.curationId}-${idx}`}
                        news={news}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ডানদিকের সর্বাধিক পঠিত সেকশন */}
        <aside className="lg:col-span-1">
          <MostRead />
        </aside>
      </div>
    </main>
  );
}