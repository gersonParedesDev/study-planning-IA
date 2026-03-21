import { type LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: number;
  collapsed: boolean;
};

export function SidebarNavItem({ icon: Icon, label, path, badge, collapsed }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      title={collapsed ? label : undefined}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-r-[9px] transition-all duration-200 group relative"
      style={{
        background: isActive ? 'rgba(79,255,176,0.07)' : 'transparent',
        borderLeft: isActive ? '2px solid #4fffb0' : '2px solid transparent',
        marginLeft: '-1px',
      }}
    >
      <Icon
        size={16}
        style={{ color: isActive ? '#4fffb0' : '#5a6478', flexShrink: 0 }}
        className="transition-colors duration-200 group-hover:text-[#e8eaf0]"
      />

      {!collapsed && (
        <>
          <span
            className="text-xs flex-1 text-left transition-colors duration-200"
            style={{ color: isActive ? '#e8eaf0' : '#5a6478' }}
          >
            {label}
          </span>
          {badge !== undefined && badge > 0 && (
            <span className="text-[10px] bg-[rgba(79,255,176,0.1)] text-[#4fffb0] rounded-full px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip cuando está colapsado */}
      {collapsed && (
        <div className="
          absolute left-[52px] z-50 px-3 py-1.5
          bg-[#111620] border border-[#1e2530] rounded-lg
          text-[#e8eaf0] text-xs font-medium whitespace-nowrap
          pointer-events-none opacity-0 group-hover:opacity-100
          transition-opacity duration-150
        ">
          {label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111620] border-l border-b border-[#1e2530] rotate-45" />
        </div>
      )}
    </button>
  );
}