import { NavLink, Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <div className="page-wrap">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="container-xx h-[var(--header-h)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="วัด" className="h-8 w-8" />
            <span className="font-display font-bold text-lg tracking-wide">วัด</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink to="/" className={({isActive})=>isActive?"text-temple-gold":"text-temple-ink/80 hover:text-temple-ink"}>หน้าแรก</NavLink>
            <NavLink to="/events" className={({isActive})=>isActive?"text-temple-gold":"text-temple-ink/80 hover:text-temple-ink"}>กิจกรรม</NavLink>
            <NavLink to="/bookings" className={({isActive})=>isActive?"text-temple-gold":"text-temple-ink/80 hover:text-temple-ink"}>การจอง</NavLink>
            <NavLink to="/login" className="btn btn-outline">เข้าสู่ระบบ</NavLink>
          </nav>
        </div>
      </header>

      <main className="container-xx py-8">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-black/5">
        <div className="container-xx py-8 text-sm text-temple-ink/70">
          © {new Date().getFullYear()} วัดของเรา • ทำด้วยความศรัทธา
        </div>
      </footer>
    </div>
  );
}
