import { type LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: number;
  collapsed: boolean;
};

export function SidebarNavItem({
  icon: Icon,
  label,
  path,
  badge,
  collapsed,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      title={collapsed ? label : undefined}
      className={`
        w-full flex items-center gap-3 py-2 rounded-md
        cursor-pointer transition-colors relative group
        ${collapsed ? 'justify-center px-0' : 'px-3'}
        ${
          isActive
            ? 'bg-study-surface border border-study-border/30'
            : 'hover:bg-study-surface/50'
        }
      `}
    >
      <Icon
        size={18}
        style={{
          color: isActive
            ? 'var(--theme-accent)'
            : 'var(--theme-muted)',
          flexShrink: 0,
        }}
      />

      {!collapsed && (
        <>
          <span
            className="text-[14px] flex-1 text-left truncate"
            style={{ color: isActive ? 'var(--theme-text)' : 'var(--theme-muted)' }}
          >
            {label}
          </span>

          {badge !== undefined && badge > 0 && (
            <span className="text-[10px] font-bold bg-study-bg text-study-muted rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center border border-study-border">
              {badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip purely CSS when collapsed */}
      {collapsed && (
        <div className="
          absolute left-[64px] z-50 px-2 py-1
          bg-study-text border border-study-border rounded-md
          text-study-bg text-[11px] font-medium whitespace-nowrap
          pointer-events-none opacity-0 group-hover:opacity-100
          transition-opacity duration-200 shadow-xl
        ">
          {label}
        </div>
      )}
    </button>
  );
}

export default SidebarNavItem;
