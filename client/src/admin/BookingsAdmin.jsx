import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const { data } = await api.get('/bookings');
    setBookings(data);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (b, status) => {
    const reason = status === 'canceled' ? prompt('เหตุผลการยกเลิก:') : '';
    await api.put(`/bookings/${b.id}/status`, { status, cancel_reason: reason });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">จัดการการจอง</h1>
      <table className="min-w-full border bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">ผู้จอง</th>
            <th className="border p-2">หัวข้อ</th>
            <th className="border p-2">วันที่</th>
            <th className="border p-2">สถานะ</th>
            <th className="border p-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td className="border p-2">{b.id}</td>
              <td className="border p-2">{b.full_name || '-'}</td>
              <td className="border p-2">{b.booking_title || b.event_id || '-'}</td>
              <td className="border p-2">{(b.booking_datetime || '').replace('T',' ')}</td>
              <td className="border p-2">{b.status}</td>
              <td className="border p-2 space-x-1">
                {b.status === 'pending' && (
                  <>
                    <button onClick={() => setStatus(b, 'confirmed')} className="bg-green-600 text-white px-2 py-1 rounded">ยืนยัน</button>
                    <button onClick={() => setStatus(b, 'rejected')} className="bg-yellow-600 text-white px-2 py-1 rounded">ปฏิเสธ</button>
                  </>
                )}
                {(b.status === 'confirmed' || b.status === 'pending') && (
                  <button onClick={() => setStatus(b, 'canceled')} className="bg-red-600 text-white px-2 py-1 rounded">ยกเลิก</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
