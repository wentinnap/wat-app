import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function UsersAdmin(){
  const [items,setItems] = useState([]);
  const load = async()=> { const { data } = await api.get('/users'); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const update = async (u)=> {
    await api.put(`/users/${u.id}`, { role: u.role, is_active: u.is_active });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">ผู้ใช้</h1>
      <table className="min-w-full border bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">ชื่อ</th>
            <th className="border p-2">อีเมล</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Active</th>
            <th className="border p-2">บันทึก</th>
          </tr>
        </thead>
        <tbody>
          {items.map(u=>(
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.full_name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">
                <select className="border p-1 rounded" value={u.role} onChange={e=>setItems(prev=>prev.map(x=>x.id===u.id?{...x,role:e.target.value}:x))}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="border p-2">
                <input type="checkbox" checked={!!u.is_active} onChange={e=>setItems(prev=>prev.map(x=>x.id===u.id?{...x,is_active:e.target.checked?1:0}:x))}/>
              </td>
              <td className="border p-2"><button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={()=>update(u)}>อัปเดต</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
