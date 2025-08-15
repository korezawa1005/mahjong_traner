function AcceptTilesList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="flex gap-8">
      {items.map((it) => (
        <li key={`${it.name}-${it.count}`} className="flex items-center gap-5">
          {it.image_url ? (
            <img src={it.image_url} alt={it.name} className="h-8 w-6 object-contain border border-gray-400 rounded-sm" />
          ) : (
            <span className="h-8 w-6 flex items-center justify-center bg-gray-100 text-xs rounded">
              {it.name}
            </span>
          )}
          <span className="mx-1">→</span>
          <span className="tabular-nums font-semibold">{it.count}</span>
        </li>
      ))}
    </ul>
  );
}
export default AcceptTilesList;
