const CallOptionsSelector = ({ options = [], selectedKeys = [], onToggle }) => {
  if (!Array.isArray(options) || options.length === 0) return null;

  const isActive = (key) => selectedKeys.includes(key);
  const handleClick = (key) => {
    if (typeof onToggle === "function") onToggle(key);
  };

  return (
    <div className="mt-8" role="group" aria-label="call-options">
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleClick(option.key)}
            className={`rounded-xl border px-4 py-3 text-base font-semibold shadow-sm transition
              ${isActive(option.key)
                ? "border-amber-500 bg-amber-50 text-amber-700"
                : "border-gray-300 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50"}
            `}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CallOptionsSelector;
