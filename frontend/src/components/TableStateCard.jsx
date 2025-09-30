const TableStateCard = ({ text, title = "状況", className = "" }) => {
  if (!text) return null;

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const containerClass = [
    "max-w-xl rounded-xl border border-amber-100 bg-white/80 px-4 py-3 shadow-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass}>
      <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-amber-600 uppercase">
        <span>{title}</span>
      </div>
      <ul className="mt-2 space-y-1 text-sm text-gray-700 lg:text-base">
        {lines.map((line, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-400" />
            <span className="whitespace-pre-wrap leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableStateCard;
