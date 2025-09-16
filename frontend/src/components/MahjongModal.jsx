import { useEffect, useRef } from "react";

const MahjongModal = ({ open, onClose, title = "メニュー", children }) => {
  const firstFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFocusRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="mj-menu-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl shadow-2xl
                        bg-gradient-to-b from-amber-50 to-stone-50
                        border border-amber-200">
          <div className="px-5 py-4 border-b border-amber-200">
            <h2 id="mj-menu-title" className="text-center font-bold
                       text-xl tracking-wide">
              {title}
            </h2>
          </div>

          <div className="px-2 py-1">
            <button ref={firstFocusRef} className="sr-only">start</button>
            {children}
          </div>

          <div className="px-5 py-3 border-t border-amber-200 text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white
                         hover:brightness-105 active:scale-[0.98] transition"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MahjongModal;
