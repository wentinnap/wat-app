import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function Home(){
  const [news,setNews] = useState([]);
  const [events,setEvents] = useState([]);

  useEffect(()=>{
    (async()=>{
      const { data: n } = await api.get('/news');
      setNews(n);
      const { data: e } = await api.get('/events');
      setEvents(e.slice(0,5));
    })();
  },[]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">หน้าแรก</h1>

      <section>
        <h2 className="font-semibold mb-2">ข่าว</h2>
        <div className="grid gap-3">
          {news.map(n=>(
            <div key={n.id} className="bg-white rounded p-4 shadow">
              <div className="font-semibold">{n.title}</div>
              <p className="text-sm opacity-80">{n.content?.slice(0,200)}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">กิจกรรมล่าสุด</h2>
        <div className="grid gap-3">
          {events.map(ev=>(
            <div key={ev.id} className="bg-white rounded p-4 shadow flex justify-between">
              <div>
                <div className="font-semibold">{ev.title}</div>
                <div className="text-sm opacity-70">{ev.start_datetime?.replace('T',' ')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
