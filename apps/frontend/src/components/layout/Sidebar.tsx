import { useState, useEffect } from 'react';
import { BookOpen, CalendarDays, Settings, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { PATHS } from '../../routes/paths';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  {
    icon: BookOpen,
    label: 'Mis materias',
    path: PATHS.HOMEPAGE,
    badge: true,
  },
  {
    icon: CalendarDays,
    label: 'Calendario',
    path: PATHS.EXAMS,
  },
  {
    icon: Settings,
    label: 'Configuración',
    path: PATHS.SETTINGS,
  },
];

type Props = {
  subjectCount?: number;
};

export function Sidebar({ subjectCount = 0 }: Props) {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Lógica de nombres capitalizados y mayúsculas
  const firstname = user?.firstname
    ? user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)
    : '';

  const lastname = user?.lastname
    ? user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)
    : '';

  const initial = user?.firstname
    ? user.firstname.charAt(0).toUpperCase() 
    : 'G';

  // Responsividad: Auto-collapse en pantallas pequeñas
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };

    handleResize(); // Check inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sincronizar ancho con el resto de la app
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', collapsed ? '80px' : '240px');
  }, [collapsed]);

  const toggleSidebar = () => {
    if (!isMobile) setCollapsed(!collapsed);
  };

  return (
    <aside
      className="fixed top-0 left-0 h-screen z-50 flex flex-col transition-[width] duration-300 ease-in-out bg-study-bg border-r border-study-border group/sidebar"
      style={{
        width: collapsed ? '80px' : '240px',
      }}
    >
      {/* Header: User Info & Toggle */}
      <div
        className="flex items-center flex-shrink-0 transition-all duration-300 border-b border-study-border/50 relative"
        style={{
          padding: collapsed ? '0' : '16px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          height: '64px'
        }}
      >
        {/* User Icon (Initial) */}
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center border border-study-border bg-study-surface text-study-text font-semibold text-[13px]"
          style={{ width: 32, height: 32 }}
        >
          {initial}
        </div>

        {/* User name & Toggle (Expanded) */}
        {!collapsed && (
          <div className="flex-1 flex items-center justify-between overflow-hidden ml-2.5">
            <div className="text-[12px] font-bold text-study-text leading-tight uppercase tracking-wide truncate">
              {firstname} {lastname}
            </div>
            
            <button
              onClick={toggleSidebar}
              className="cursor-pointer p-1 rounded-md hover:bg-study-bg text-study-muted transition-colors flex-shrink-0"
              title="Contraer"
            >
              <ChevronsLeft size={16} />
            </button>
          </div>
        )}

        {/* Toggle (Collapsed) - Absolute to keep Initial perfectly centered */}
        {collapsed && !isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer p-0.5 rounded-md hover:bg-study-bg text-study-muted transition-colors opacity-0 group-hover/sidebar:opacity-100"
            title="Expandir"
          >
            <ChevronsRight size={10} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1.5">
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
      </nav>

      {/* Footer: Simple Border (No redundant card) */}
      <div className="mt-auto border-t border-study-border/30 p-2 text-center">
        <div className="text-[9px] text-study-muted font-medium uppercase tracking-[2px] opacity-40">
           {collapsed ? 'S·A' : 'StudyAI'}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
