import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function Events(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ (async()=>{
    const { data } = await api.get('/events'); setItems(data);
  })(); },[]);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">กิจกรรมทั้งหมด</h1>
      {items.map(v=>(
        <div key={v.id} className="bg-white p-4 rounded shadow">
          <div className="font-semibold">{v.title}</div>
          <div className="text-sm opacity-70">{v.start_datetime?.replace('T',' ')} - {v.end_datetime?.replace('T',' ')}</div>
          <div className="text-sm">{v.location || '-'}</div>
          <div className="mt-1">{v.description || ''}</div>
        </div>
      ))}
    </div>
  );
}
