import { useState } from 'react';
import { BookOpen, CalendarDays, TrendingUp, UserCircle, Settings2, Menu, X } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarSection } from './SidebarSection';
import { SidebarUserCard } from './SidebarUserCard';
import { PATHS } from '../../routes/paths';

const NAV_ITEMS = [
  { icon: BookOpen,    label: 'Mis materias', path: PATHS.HOMEPAGE,  badge: true },
  { icon: CalendarDays, label: 'Parciales',   path: PATHS.EXAMS },
  { icon: TrendingUp,  label: 'Progreso',     path: PATHS.PROGRESS },
];

const BOTTOM_ITEMS = [
  { icon: UserCircle,  label: 'Perfil',        path: PATHS.PROFILE },
  { icon: Settings2,   label: 'Configuración', path: PATHS.SETTINGS },
];

export function Sidebar({ subjectCount = 0 }: { subjectCount?: number }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className="fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? '68px' : '220px',
        background: '#0a0e14',
        borderRight: '0.5px solid #1e2530',
      }}
    >
      {/* Header — logo + toggle */}
      <div
        className="flex items-center border-b border-[#1e2530] flex-shrink-0"
        style={{
          padding: collapsed ? '18px 13px' : '16px',
          gap: collapsed ? 0 : '10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        {/* Logo mark */}
        <div
          className="flex-shrink-0 rounded-[9px] flex items-center justify-center"
          style={{ width: 32, height: 32, background: '#4fffb0' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 4h8M3 7h6M3 10h4" stroke="#080b10" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="13" cy="11" r="3.5" stroke="#080b10" strokeWidth="1.5"/>
            <path d="M15.5 13.5L17 15" stroke="#080b10" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Logo text — solo expandido */}
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <div className="text-[13px] font-medium text-[#e8eaf0] leading-tight">StudyAI</div>
            <div className="text-[10px] text-[#5a6478] leading-tight">Plataforma de estudio</div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-[#111620] transition-colors"
          style={{ color: '#5a6478', marginLeft: collapsed ? 0 : 'auto' }}
        >
          {collapsed ? <Menu size={14} /> : <X size={14} />}
        </button>
      </div>

      {/* Nav principal */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        <SidebarSection label="Principal" collapsed={collapsed} />
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            badge={item.badge ? subjectCount : undefined}
            collapsed={collapsed}
          />
        ))}

        <SidebarSection label="Cuenta" collapsed={collapsed} />
        {BOTTOM_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* User card */}
      <div className="border-t border-[#1e2530] p-2">
        <SidebarUserCard collapsed={collapsed} />
      </div>
    </aside>
  );
}

export default Sidebar;