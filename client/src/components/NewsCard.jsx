export default function NewsCard({ item, onClick }) {
  return (
    <article onClick={onClick} className="card card-hover cursor-pointer overflow-hidden">
      <img src={item.cover || "/news-fallback.jpg"} alt="" className="h-40 w-full object-cover"/>
      <div className="p-4">
        <h3 className="font-display font-semibold line-clamp-2">{item.title}</h3>
        <p className="mt-2 text-sm text-temple-ink/70 line-clamp-2">{item.excerpt || item.content}</p>
        <div className="mt-4 text-xs text-temple-ink/60">{new Date(item.created_at).toLocaleDateString("th-TH")}</div>
      </div>
    </article>
  );
}
