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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}