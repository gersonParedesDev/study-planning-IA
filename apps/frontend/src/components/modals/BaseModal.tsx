type BaseModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function BaseModal({ open, onClose, children }: BaseModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[420px] rounded-[20px] p-8"
        style={{ background: "#111620", border: "1px solid #1e2530" }}
      >
        {children}
      </div>
    </div>
  );
}