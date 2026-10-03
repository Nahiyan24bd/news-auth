# 📰 Bangla News 24 (News & Auth Portal)

একটি আধুনিক, দ্রুতগতির এবং সম্পূর্ণ মোবাইল-রেসপন্সিভ অনলাইন নিউজ পোর্টাল ও অথেনটিকেশন ওয়েব অ্যাপ্লিকেশন। এটি তৈরি করা হয়েছে **Next.js (App Router)**, **TypeScript**, এবং **Tailwind CSS** ব্যবহার করে।

---

## 🚀 প্রধান ফিচারসমূহ (Key Features)

- **সর্বশেষ সংবাদ স্ক্রলিং (Breaking News Marquee):** পৃষ্ঠার শীর্ষে স্বয়ংক্রিয়ভাবে লাইভ সংবাদ শিরোনাম স্ক্রল হওয়ার ব্যবস্থা।
- **ডায়নামিক নিউজ ফিড (Dynamic News Feed):** প্রধান খবর (Main News) এবং ক্যাটাগরিভিত্তিক সংবাদের সুন্দর গ্রিড ও কার্ড ডিসপ্লে।
- **ইউজার অথেনটিকেশন ইউআই (Authentication UI):**
  - মিনিমাল ও ক্লিন সাইন ইন পেজ (`/sign-in` বা `/sing-in`)
  - পূর্ণাঙ্গ ফিল্ডসহ সাইন আপ পেজ (`/sign-up` বা `/sing-up`)
- **সম্পূর্ণ মোবাইল রেসপন্সিভ (Fully Responsive):** মোবাইল, ট্যাবলেট ও ডেস্কটপ সব ধরনের ডিভাইসের জন্য অপ্টিমাইজড লেআউট।
- **সার্ভার সাইড রেন্ডারিং (SSR) ও ক্যাশিং:** দ্রুত ডেটা লোডিং নিশ্চিত করতে Next.js-এর ইন-বিল্ট ক্যাশিং ও রিভ্যালিডেশন সাপোর্ট।

---

## 🛠 ব্যবহৃত প্রযুক্তি (Tech Stack)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [HeroUI](https://heroui.com/)
- **Utilities:** `react-marquee-text`

---

## 📁 ফোল্ডার স্ট্রাকচার (Folder Structure)

```text
news-auth/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   └── sign-up/
│   │   │       └── page.tsx
│   │   ├── category/
│   │   │   └── [categoryId]/
│   │   ├── news/
│   │   │   └── [newsId]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Header.tsx
│       ├── NavLinks.tsx
│       ├── Marquee.tsx
│       ├── MainNews.tsx
│       ├── NewsCard.tsx
│       ├── MostRead.tsx
│       └── Footer.tsx
├── public/
│   └── logo.webp
├── package.json
└── README.md