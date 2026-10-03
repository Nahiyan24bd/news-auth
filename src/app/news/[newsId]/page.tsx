import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NewsDetailProps {
  params: Promise<{ newsId: string }>;
}

// আর্টিকেলের ভেতরের প্রতিটি ব্লকের টাইপ
interface ArticleContentBlock {
  type?: string;
  imageUrl?: string;
  url?: string;
  caption?: string;
  alt?: string;
  text?: string;
  content?: string;
  data?: {
    text?: string;
    caption?: string;
    file?: {
      url?: string;
    };
  };
}

// API থেকে আসা মূল ডেটার টাইপ
interface NewsDetailItem {
  id?: string;
  title: string;
  category?: string;
  subtitle?: string;
  summary?: string;
  lead?: string;
  leadParagraph?: string;
  firstPublished?: string;
  publishedAt?: string;
  createdAt?: string;
  wordCount?: string;
  source?: string;
  imageUrl?: string;
  imageAlt?: string;
  tags?: string[];
  article?: ArticleContentBlock[] | string;
  content?: ArticleContentBlock[] | string;
  body?: ArticleContentBlock[] | string;
  paragraphs?: ArticleContentBlock[] | string;
  details?: ArticleContentBlock[] | string;
  description?: {
    blocks?: ArticleContentBlock[];
  } | string;
}

const NewsDetailPage = async ({ params }: NewsDetailProps) => {
  const { newsId } = await params;

  let newsItem: NewsDetailItem | null = null;

  try {
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`, {
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const json = await res.json();
      newsItem = (json?.data || json) as NewsDetailItem;
    }
  } catch (error) {
    console.error("API Fetch Error:", error);
  }

  if (!newsItem) {
    notFound();
  }

  // বাংলা তারিখ ফরম্যাট
  const publishTime = newsItem.firstPublished || newsItem.publishedAt || newsItem.createdAt;
  const formattedDate = publishTime
    ? new Date(publishTime).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : null;

  // কনটেন্ট রেন্ডারার
  const renderArticleBody = () => {
    if (!newsItem) return null;

    const rawContent =
      newsItem.article ||
      newsItem.content ||
      newsItem.body ||
      newsItem.paragraphs ||
      newsItem.details ||
      (typeof newsItem.description === "object" ? newsItem.description?.blocks : newsItem.description);

    if (!rawContent) return null;

    // ১. HTML স্ট্রিং হিসেবে আসলে
    if (typeof rawContent === "string" && (rawContent.includes("<p>") || rawContent.includes("</div>"))) {
      return (
        <div
          className="prose prose-slate max-w-none text-[17px] sm:text-[18.5px] leading-[1.85] text-slate-800 space-y-5"
          dangerouslySetInnerHTML={{ __html: rawContent }}
        />
      );
    }

    // ২. সাধারণ টেক্সট স্ট্রিং হলে
    if (typeof rawContent === "string") {
      return (
        <div className="space-y-6 text-[17px] sm:text-[18.5px] leading-[1.85] text-slate-800">
          {rawContent.split(/\n+/).map((para, idx) => (
            <p key={idx}>{para.trim()}</p>
          ))}
        </div>
      );
    }

    // ৩. অ্যারে আকারে আসলে (ছবি, হেডিং ও প্যারাগ্রাফ)
    if (Array.isArray(rawContent)) {
      return (
        <div className="space-y-6 text-[17px] sm:text-[18.5px] leading-[1.85] text-slate-800">
          {rawContent.map((item: ArticleContentBlock | string, idx: number) => {
            if (typeof item === "string") {
              return <p key={idx}>{item}</p>;
            }

            // ছবি রেন্ডার
            if (item?.type === "image" || item?.imageUrl || item?.data?.file?.url) {
              const img = item.imageUrl || item?.data?.file?.url || item?.url;
              const caption = item.caption || item?.data?.caption || item?.alt;
              if (!img) return null;

              return (
                <figure key={idx} className="my-6">
                  {/* Tailwind Canonical Class aspect-16/10 ব্যবহার করা হয়েছে */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 rounded-sm">
                    <Image
                      src={img}
                      alt={caption || "Article visual"}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 750px"
                      className="object-cover"
                    />
                  </div>
                  {caption && (
                    <figcaption className="mt-2 text-xs text-slate-500 font-normal leading-normal">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // সাব-হেডিং
            if (item?.type === "header" || item?.type === "heading") {
              return (
                <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 pt-4 tracking-tight">
                  {item?.data?.text || item?.text}
                </h2>
              );
            }

            // সাধারণ টেক্সট
            const textContent = item?.data?.text || item?.text || item?.content;
            if (textContent) {
              return (
                <p
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: textContent }}
                />
              );
            }

            return null;
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* শীর্ষ লাল বর্ডার */}
      <div className="h-1 w-full bg-[#b80000]" />

      <article className="max-w-3xl mx-auto px-4 py-8 font-sans">
        {/* ব্রেডক্রাম্ব */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-3">
          <Link href="/" className="hover:underline">
            প্রচ্ছদ
          </Link>
          <span>/</span>
          <span className="text-[#b80000]">{newsItem.category || "সংবাদ"}</span>
        </div>

        {/* প্রধান শিরোনাম */}
        <h1 className="text-2xl sm:text-[34px] font-bold text-slate-950 leading-[1.3] tracking-tight mb-4">
          {newsItem.title}
        </h1>

        {/* সাব-হেডলাইন / ভূমিকা */}
        {(newsItem.subtitle || newsItem.summary || newsItem.lead || newsItem.leadParagraph) && (
          <p className="text-[18px] sm:text-[19px] leading-relaxed text-slate-700 font-normal mb-5">
            {newsItem.subtitle || newsItem.summary || newsItem.lead || newsItem.leadParagraph}
          </p>
        )}

        {/* মেটা ইনফো */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 border-b border-slate-200 pb-4 mb-6">
          {formattedDate && <time>{formattedDate}</time>}
          {newsItem.wordCount && (
            <>
              <span>•</span>
              <span>{newsItem.wordCount}</span>
            </>
          )}
          {newsItem.source && (
            <>
              <span>•</span>
              <span className="text-slate-600">সূত্র: {newsItem.source}</span>
            </>
          )}
        </div>

        {/* সংবাদের মূল অংশ */}
        <div className="article-body">
          {renderArticleBody()}
        </div>

        {/* নিচের ট্যাগসমূহ */}
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
};

export default NewsDetailPage;