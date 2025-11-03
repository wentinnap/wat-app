import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout(){
  const { logout } = useAuth();
  const loc = useLocation();
  const link = (to,label)=> <Link className={`px-3 py-2 rounded ${loc.pathname===to?'bg-indigo-600 text-white':'hover:bg-gray-100'}`} to={to}>{label}</Link>;
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-2">
        <div className="font-bold text-lg mb-4">Admin Panel</div>
        {link('/admin','แดชบอร์ด')}
        {link('/admin/news','ข่าว')}
        {link('/admin/events','กิจกรรม')}
        {link('/admin/bookings','การจอง')}
        {link('/admin/users','ผู้ใช้')}
        <button onClick={logout} className="mt-6 text-sm text-red-600">ออกจากระบบ</button>
      </aside>
      <main className="p-6"><Outlet/></main>
    </div>
  );
}
