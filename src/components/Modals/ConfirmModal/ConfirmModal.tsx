import { Modal } from "../Modal";

interface ConfirmModalProps {
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  title,
  message,
  confirmLabel = "Delete",
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal title={title} onClose={onClose}>
      <div className="text-black/80">{message}</div>

      <div className="flex justify-end gap-2 pt-6">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="cursor-pointer rounded-xl bg-black/10 px-4 py-2 text-sm font-semibold text-black/80 transition-all hover:bg-black/20"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-400"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
