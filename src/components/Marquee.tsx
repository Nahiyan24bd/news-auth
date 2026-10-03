import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headline {
    id: string;
    title: string;
    url: string;
    category: string;
    topicId: string | null;
    scrapable: boolean;
}
const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=15");
    const data = await res.json();
    const headlines: Headline[] = data.data
    return (
        <div className="bg-red-600 text-white py-0 px-2">

        <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="bg-red-900 text-white  px-5 py-2 font-bold">
            সর্বশেষ
        </div>

            <MarqueeText direction="right" duration={10} >
                {headlines.map(h => (
                    <span key={h.id}>
                        <span>{h.title}</span>
                        <span className="mx-5">•</span>
                    </span>
                ))}
            </MarqueeText>
        </div>
        </div>
    );
};

export default Marquee;