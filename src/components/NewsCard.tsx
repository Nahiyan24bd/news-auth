import Image from "next/image";
import Link from "next/link";

export interface NewsCardItem {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  link?: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  firstPublished?: string;
  publishedAt?: string;
  source?: string;
}

interface NewsCardProps {
  news: NewsCardItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const newsId = news.id || news._id || "";

  return (
    <Link
      href={`/news/${newsId}`}
      className="group flex flex-col h-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        {news.imageUrl ? (
          <Image
            src={news.imageUrl}
            alt={news.imageAlt || news.title || "News"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            ছবি নেই
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        {news.category && (
          <span className="text-[11px] font-bold text-red-600 mb-1">
            {news.category}
          </span>
        )}

        <h3 className="text-sm sm:text-base font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
          {news.title}
        </h3>

        {news.description && (
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-auto">
            {news.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;