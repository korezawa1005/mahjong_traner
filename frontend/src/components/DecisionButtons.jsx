export const DECISION_LABELS = {
  push: "オシ",
  fold: "ヒキ"
};

const DecisionButtons = ({ options = [], onSelect }) => {
  if (!Array.isArray(options) || options.length === 0) return null;
  const handleClick = (key) => {
    if (typeof onSelect === "function") onSelect(key);
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      {options.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => handleClick(key)}
          className="w-full sm:w-48 rounded-full border border-amber-300 bg-white px-6 py-3 text-lg font-semibold text-amber-700 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 active:scale-[0.99]"
        >
          {DECISION_LABELS[key] || key}
        </button>
      ))}
    </div>
  );
};

export default DecisionButtons;
