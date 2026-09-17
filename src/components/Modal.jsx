import { useEffect, useRef } from "react";

export default function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="cv-dialog"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
        <h2 id="dialog-title" className="h4 mb-0">
          {title}
        </h2>
        <button
          type="button"
          className="btn-close"
          aria-label="Fechar janela"
          onClick={onClose}
        />
      </div>
      {children}
    </dialog>
  );
}
