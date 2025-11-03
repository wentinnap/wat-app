import { useAuth } from '../context/AuthContext';
import { api } from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [email,setEmail] = useState('admin@wat.local');
  const [password,setPassword] = useState('Admin@1234');
  const [err,setErr] = useState('');

  const submit = async (e)=> {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      nav(data.user.role === 'admin' ? '/admin' : '/');
    } catch(e){
      setErr(e.response?.data?.message || 'เข้าสู่ระบบล้มเหลว');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow w-96 space-y-3">
        <h1 className="text-xl font-bold text-center">เข้าสู่ระบบ</h1>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <input className="border w-full p-2 rounded" placeholder="อีเมล" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="border w-full p-2 rounded" placeholder="รหัสผ่าน" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}
