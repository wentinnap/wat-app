export default function EventCard({ ev, onBook }) {
  return (
    <div className="card p-5 card-hover">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold">{ev.title}</h3>
          <p className="text-sm text-temple-ink/70 mt-1">{ev.description}</p>
          <div className="text-xs mt-2 text-temple-ink/60">
            วันที่: {new Date(ev.date).toLocaleDateString("th-TH")} • เวลา: {ev.time || "-"}
          </div>
        </div>
        {onBook && <button className="btn btn-primary" onClick={onBook}>จองเข้าร่วม</button>}
      </div>
    </div>
  );
}
