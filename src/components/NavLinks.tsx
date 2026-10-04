import Link from "next/link";

interface Category {
  title: string;
  slug: string;
  scrapable?: boolean;
}

const NavLinks = async () => {
  let categories: Category[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      categories = data?.data || [];
    }
  } catch (error) {
    console.error("Categories fetch failed:", error);
  }

  // scrapable ট্রু থাকলে ভালো, না থাকলে সব ক্যাটাগরিই দেখাবে
  const displayCategories = categories.length > 0 
    ? (categories.some(c => c.scrapable) ? categories.filter(c => c.scrapable !== false) : categories)
    : [];

  return (
    <nav className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto py-2 text-sm sm:text-base font-semibold text-slate-700 scrollbar-none">
        <Link href="/" className="hover:text-[#b80000] transition-colors whitespace-nowrap">
          হোম
        </Link>
        {displayCategories.map((c, i) => (
          <Link
            key={c.slug || i}
            href={`/category/${c.slug}`}
            className="hover:text-[#b80000] transition-colors whitespace-nowrap"
          >
            {c.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;