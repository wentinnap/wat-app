import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function Dashboard(){
  const [rows,setRows] = useState([]);
  useEffect(()=>{ (async()=>{
    try{
      const { data } = await api.get('/analytics/dau');
      setRows(data);
    }catch(e){ /* ignore */ }
  })() },[]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">แดชบอร์ด</h1>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">วัน</th>
            <th className="border p-2">DAU</th>
            <th className="border p-2">Pageviews</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td className="border p-2">{r.day?.slice(0,10)}</td>
              <td className="border p-2">{r.dau}</td>
              <td className="border p-2">{r.pageviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
