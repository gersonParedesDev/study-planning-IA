import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type NavItem = {
  id: string;
  icon: string;
  label: string;
  href?: string;
};

export type SidebarProps = {
  navItems?: NavItem[];
  bottomItems?: NavItem[];
  activeId?: string;
  onNavChange?: (id: string) => void;
  user?: {
    name: string;
    initials: string;
  };
};

// ─── Default nav config ───────────────────────────────────────────────────────

const DEFAULT_NAV: NavItem[] = [
  { id: "subjects",  icon: "📚", label: "Materias" },
  { id: "planning",  icon: "📅", label: "Planificación" },
  { id: "quizzes",   icon: "❓", label: "Quizzes" },
  { id: "summaries", icon: "🧠", label: "Resúmenes" },
  { id: "progress",  icon: "📊", label: "Progreso" },
];

const DEFAULT_BOTTOM: NavItem[] = [
  { id: "settings", icon: "⚙️", label: "Configuración" },
];

// ─── NavButton ────────────────────────────────────────────────────────────────

type NavButtonProps = {
  item: NavItem;
  active: boolean;
  onClick: () => void;
};

function NavButton({ item, active, onClick }: NavButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Active indicator bar */}
      {active && (
        <div className="absolute -left-px w-[3px] h-[22px] rounded-r-full bg-[#4fffb0]" />
      )}

      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={item.label}
        className={`
          relative w-[42px] h-[42px] rounded-[10px] border-none
          flex items-center justify-center text-lg cursor-pointer
          transition-all duration-200
          ${active
            ? "bg-[rgba(79,255,176,0.07)] text-[#4fffb0]"
            : "bg-transparent text-[#5a6478] hover:bg-[#111620] hover:text-[#e8eaf0]"
          }
        `}
      >
        {item.icon}
      </button>

      {/* Tooltip */}
      {hovered && (
        <div
          className="
            absolute left-[52px] z-50 px-3 py-1.5
            bg-[#111620] border border-[#1e2530] rounded-lg
            text-[#e8eaf0] text-xs font-medium whitespace-nowrap
            pointer-events-none
          "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.label}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111620] border-l border-b border-[#1e2530] rotate-45" />
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  navItems = DEFAULT_NAV,
  bottomItems = DEFAULT_BOTTOM,
  activeId,
  onNavChange,
  user = { name: "Juan García", initials: "JG" },
}: SidebarProps) {
  const [active, setActive] = useState(activeId ?? navItems[0]?.id ?? "");

  function handleNav(id: string) {
    setActive(id);
    onNavChange?.(id);
  }

  return (
    <aside
      className="
        fixed top-0 left-0 h-screen w-[68px] z-50
        flex flex-col items-center py-6 gap-2
        bg-[#0e1219] border-r border-[#1e2530]
      "
    >
      {/* Logo */}
      <div
        className="
          w-9 h-9 rounded-[9px] bg-[#4fffb0]
          flex items-center justify-center mb-5 flex-shrink-0
          text-[#080b10] text-[13px] font-extrabold tracking-tighter
          select-none cursor-default
        "
        style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}
      >
        S·A
      </div>

      {/* Main nav */}
      <nav className="flex flex-col items-center gap-2 w-full px-3">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={active === item.id}
            onClick={() => handleNav(item.id)}
          />
        ))}
      </nav>

      {/* Divider */}
      <div className="w-8 h-px bg-[#1e2530] my-2" />

      {/* Bottom nav */}
      <nav className="flex flex-col items-center gap-2 w-full px-3">
        {bottomItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={active === item.id}
            onClick={() => handleNav(item.id)}
          />
        ))}
      </nav>

      {/* User avatar */}
      <div className="mt-auto">
        <div
          title={user.name}
          className="
            w-9 h-9 rounded-full cursor-pointer select-none
            flex items-center justify-center
            text-[#080b10] text-[13px] font-bold
            border-2 border-transparent
            hover:border-[#4fffb0] transition-all duration-200
          "
          style={{
            background: "linear-gradient(135deg, #4fffb0 0%, #63a0ff 100%)",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {user.initials}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;