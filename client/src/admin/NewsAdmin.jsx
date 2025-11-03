import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function NewsAdmin(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ title:'', content:'', is_hidden:false });

  const load = async()=> {
    const { data } = await api.get('/news');
    setItems(data);
  };
  useEffect(()=>{ load(); },[]);

  const save = async (e)=> {
    e.preventDefault();
    await api.post('/news', form);
    setForm({ title:'', content:'', is_hidden:false });
    load();
  };

  const update = async (n)=> {
    await api.put(`/news/${n.id}`, {...n, is_hidden: n.is_hidden?1:0});
    load();
  };

  const remove = async (id)=> { await api.delete(`/news/${id}`); load(); };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">จัดการข่าว</h1>
      <form onSubmit={save} className="grid gap-2 max-w-xl bg-white p-4 rounded shadow">
        <input className="border p-2 rounded" placeholder="หัวข้อ" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <textarea className="border p-2 rounded" placeholder="เนื้อหา" value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.is_hidden} onChange={e=>setForm({...form,is_hidden:e.target.checked})}/>
          ซ่อนข่าวนี้
        </label>
        <button className="bg-indigo-600 text-white p-2 rounded w-max">บันทึก</button>
      </form>

      <div className="grid gap-3">
        {items.map(n=>(
          <div key={n.id} className="border rounded p-3 bg-white shadow">
            <div className="font-semibold">{n.title}</div>
            <div className="text-sm opacity-80">{n.is_hidden ? 'ซ่อนอยู่' : 'แสดงอยู่'}</div>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>update({...n, is_hidden: !n.is_hidden})}>{n.is_hidden?'ยกเลิกซ่อน':'ซ่อน'}</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={()=>remove(n.id)}>ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
