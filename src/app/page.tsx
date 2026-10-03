import MainNews from "@/components/MainNews";
import Marquee from "../components/Marquee"


export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data
  const mainNews = sections[0].articles
  return (
    <div>
      <Marquee />
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto p-4">
        {/* news section */}
        <div className="col-span-2">
          <MainNews news={mainNews} />
        </div>

        {/*most red news section */}
        <div className="col-span-1"></div>
      </div>
     
    </div>
  );
}
