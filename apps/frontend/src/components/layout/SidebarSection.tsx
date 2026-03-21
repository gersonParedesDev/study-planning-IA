type Props = {
  label: string;
  collapsed: boolean;
};

export function SidebarSection({ label, collapsed }: Props) {
  if (collapsed) {
    return <div className="w-8 h-px bg-[#1e2530] mx-auto my-2" />;
  }

  return (
    <div className="text-[10px] text-[#3a4255] uppercase tracking-widest px-3 mt-3 mb-1">
      {label}
    </div>
  );
}