
import Link from "next/link";

interface Category {
    title: string;
    slug: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}
const NavLinks = async () => {
    const res =await fetch("https://news-api-v2.vercel.app/api/categories");
    const data = await res.json();
    const categories: Category[] = data.data;
    const filteredCategories = categories.filter(c => c.scrapable === true);
    return (
        <div className="flex items-center justify-center gap-4 p-4 text-lg font-medium text-slate-700">
           <Link href="/">হোম</Link>
           {filteredCategories.map((c, i) => (
                <Link key={i} href={`/category/${c.slug}`}>
                    {c.title}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;