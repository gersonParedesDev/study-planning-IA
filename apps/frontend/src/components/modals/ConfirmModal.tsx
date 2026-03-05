import { BaseModal } from "./BaseModal";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
  danger?: boolean;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  onConfirm,
  onClose,
  loading = false,
  danger = false,
}: Props) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <div
        className="w-full max-w-[380px] rounded-[20px] p-8 flex flex-col gap-6"
        style={{ background: "#111620", border: "1px solid #1e2530" }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-[#e8eaf0]">{title}</h2>
          <p className="text-sm text-[#5a6478]">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-[10px] text-sm font-semibold text-[#5a6478] transition-all hover:text-[#e8eaf0]"
            style={{ background: "#0e1219", border: "1px solid #1e2530" }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-[10px] text-sm font-semibold transition-all"
            style={{
              background: danger ? "#ff4444" : "#4fffb0",
              color: danger ? "#fff" : "#080b10",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Eliminando..." : confirmLabel}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}