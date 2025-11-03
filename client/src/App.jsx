import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Events from './pages/Events';
import Bookings from './pages/Bookings';

import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import NewsAdmin from './admin/NewsAdmin';
import EventsAdmin from './admin/EventsAdmin';
import UsersAdmin from './admin/UsersAdmin';
import BookingsAdmin from './admin/BookingsAdmin';

function Navbar(){
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-4">
        <Link to="/" className="font-semibold">วัด</Link>
        <Link to="/events" className="hover:underline">กิจกรรม</Link>
        <Link to="/bookings" className="hover:underline">การจอง</Link>
        <Link to="/login" className="ml-auto hover:underline">เข้าสู่ระบบ</Link>
      </div>
    </nav>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/bookings" element={<ProtectedRoute allowRoles={['user','admin']}><Bookings/></ProtectedRoute>}/>

          <Route path="/admin" element={
            <ProtectedRoute allowRoles={['admin']}>
              <AdminLayout/>
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard/>}/>
            <Route path="news" element={<NewsAdmin/>}/>
            <Route path="events" element={<EventsAdmin/>}/>
            <Route path="bookings" element={<BookingsAdmin/>}/>
            <Route path="users" element={<UsersAdmin/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
