import { useEffect } from "react";
import { X as CloseIcon } from "lucide-react";
import { IconButton } from "../Buttons/IconButton";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 pb-28"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-black/90">{title}</h3>

          <IconButton
            icon={CloseIcon}
            onClick={onClose}
            className="text-gray-400 hover:text-black/70"
          />
        </div>

        {children}
      </div>
    </div>
  );
}
