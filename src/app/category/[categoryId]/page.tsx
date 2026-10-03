import NewsCard, { NewsCardItem } from "@/components/NewsCard";

interface CategoryNewsProps {
  params: Promise<{ categoryId: string }>;
}

interface CategoryApiResponse {
  success?: boolean;
  title?: string;
  data?: NewsCardItem[];
}

const CategoryNews = async ({ params }: CategoryNewsProps) => {
  // ১. params অ্যাসিনক্রোনাসলি আনপ্যাক করা
  const { categoryId } = await params;

  let categoryData: CategoryApiResponse | null = null;

  try {
    // ২. API থেকে ডাটা ফেচ করা
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${categoryId}`,
      {
        next: { revalidate: 120 },
      }
    );

    if (res.ok) {
      categoryData = await res.json();
    }
  } catch (error) {
    console.error("Category Fetch Error:", error);
  }

  // API রেসপন্সে ডাটার ভেতরে থাকা সংবাদ তালিকা
  const newsItems = categoryData?.data ?? [];

  return (
    <main className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ক্যাটাগরি হেডিং */}
        <div className="border-b-2 border-red-600 pb-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {categoryData?.title || "ক্যাটাগরি সংবাদ"}
          </h1>
        </div>

        {/* ৩. NewsCard কম্পোনেন্ট ম্যাপ করে গ্রিডে শো করা */}
        {newsItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newsItems.map((item: NewsCardItem, idx: number) => (
              <NewsCard
                key={item.id || item._id || `${categoryId}-${idx}`}
                news={item}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500 bg-white rounded-xl border border-slate-200">
            কোনো সংবাদ পাওয়া যায়নি।
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryNews;