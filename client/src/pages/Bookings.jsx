import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function Bookings(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ booking_title: '', booking_datetime: '' });

  const load = async()=>{
    const { data } = await api.get('/bookings');
    setItems(data);
  };

  useEffect(()=>{ load(); },[]);

  const submit = async (e)=>{
    e.preventDefault();
    await api.post('/bookings', form);
    setForm({ booking_title: '', booking_datetime: '' });
    load();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">การจองของฉัน</h1>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow grid gap-2">
        <input className="border p-2 rounded" placeholder="หัวข้อการจอง" value={form.booking_title} onChange={e=>setForm({...form, booking_title:e.target.value})}/>
        <input className="border p-2 rounded" type="datetime-local" value={form.booking_datetime} onChange={e=>setForm({...form, booking_datetime:e.target.value})}/>
        <button className="bg-indigo-600 text-white px-3 py-2 rounded w-max">ส่งจอง</button>
      </form>

      <div className="grid gap-2">
        {items.map(b=>(
          <div key={b.id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{b.booking_title || '-'}</div>
              <div className="text-sm opacity-70">{b.booking_datetime?.replace('T',' ')}</div>
              <div className="text-sm">สถานะ: {b.status}</div>
              {b.cancel_reason && <div className="text-sm text-red-700">เหตุผลยกเลิก: {b.cancel_reason}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
