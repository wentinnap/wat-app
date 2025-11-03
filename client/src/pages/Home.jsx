import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import EventCard from "../components/EventCard";

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news?limit=3`)
      .then(res => res.json())
      .then(setNews)
      .catch(console.error);

    fetch(`${import.meta.env.VITE_API_URL}/events?limit=3`)
      .then(res => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl shadow-gold bg-white">
        <img
          src="/hero-temple.jpg"
          alt="วัด"
          className="w-full h-[420px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold drop-shadow-lg">
            วัดแห่งศรัทธาและปัญญา
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-white/90">
            ศูนย์รวมจิตใจของชุมชน พื้นที่แห่งธรรมะ กิจกรรม และการเรียนรู้
          </p>
          <a
            href="/events"
            className="mt-8 btn btn-primary bg-temple-gold text-black hover:brightness-110"
          >
            ดูกิจกรรมทั้งหมด
          </a>
        </div>
      </section>

      {/* SECTION ข่าว */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-temple-ink">
            ข่าวสารจากวัด
          </h2>
          <a href="/news" className="text-temple-gold hover:underline">
            ดูทั้งหมด →
          </a>
        </div>
        {news.length === 0 ? (
          <p className="text-temple-ink/60">ยังไม่มีข่าวในขณะนี้</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION กิจกรรม */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-temple-ink">
            กิจกรรมล่าสุด
          </h2>
          <a href="/events" className="text-temple-gold hover:underline">
            ดูทั้งหมด →
          </a>
        </div>
        {events.length === 0 ? (
          <p className="text-temple-ink/60">ยังไม่มีกิจกรรมในขณะนี้</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
