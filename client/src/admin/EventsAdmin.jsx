import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function EventsAdmin(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ title:'', description:'', location:'', start_datetime:'', end_datetime:'' });

  const load = async()=> { const { data } = await api.get('/events'); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const save = async (e)=> {
    e.preventDefault();
    await api.post('/events', form);
    setForm({ title:'', description:'', location:'', start_datetime:'', end_datetime:'' });
    load();
  };

  const update = async (eItem)=> {
    await api.put(`/events/${eItem.id}`, eItem);
    load();
  };

  const remove = async (id)=> { await api.delete(`/events/${id}`); load(); };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">จัดการกิจกรรม</h1>
      <form onSubmit={save} className="grid gap-2 max-w-xl bg-white p-4 rounded shadow">
        <input className="border p-2 rounded" placeholder="ชื่อกิจกรรม" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <textarea className="border p-2 rounded" placeholder="รายละเอียด" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <input className="border p-2 rounded" placeholder="สถานที่" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <input className="border p-2 rounded" type="datetime-local" value={form.start_datetime} onChange={e=>setForm({...form,start_datetime:e.target.value})}/>
        <input className="border p-2 rounded" type="datetime-local" value={form.end_datetime} onChange={e=>setForm({...form,end_datetime:e.target.value})}/>
        <button className="bg-indigo-600 text-white p-2 rounded w-max">บันทึก</button>
      </form>

      <div className="grid gap-3">
        {items.map(ev=>(
          <div key={ev.id} className="border rounded p-3 bg-white shadow">
            <div className="font-semibold">{ev.title}</div>
            <div className="text-sm opacity-80">{ev.start_datetime?.replace('T',' ')} - {ev.end_datetime?.replace('T',' ')}</div>
            <div className="text-sm">{ev.location || '-'}</div>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>update(ev)}>แก้ไข (บันทึกค่าเดิม)</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={()=>remove(ev.id)}>ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
