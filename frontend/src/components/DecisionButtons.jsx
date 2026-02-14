export const DECISION_LABELS = {
  push: "押し",
  fold: "引き"
};

const CONTAINER_CLASS =
  "mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center";
const BUTTON_CLASS =
  "w-full sm:w-48 rounded-full border border-amber-300 bg-white px-6 py-3 text-lg font-semibold text-amber-700 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 active:scale-[0.99]";

const getDecisionLabel = (key) => DECISION_LABELS[key] ?? key;

const DecisionButtons = ({ options = [], onSelect }) => {
  const optionKeys = Array.isArray(options) ? options : [];
  if (optionKeys.length === 0) return null;

  const handleSelect = (key) => {
    if (typeof onSelect !== "function") return;
    onSelect(key);
  };

  return (
    <div className={CONTAINER_CLASS}>
      {optionKeys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => handleSelect(key)}
          className={BUTTON_CLASS}
        >
          {getDecisionLabel(key)}
        </button>
      ))}
    </div>
  );
};

export default DecisionButtons;
