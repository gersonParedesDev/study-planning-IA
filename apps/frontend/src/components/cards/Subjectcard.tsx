import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SubjectColor =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "cyan"
  | "pink";

export type SubjectCardProps = {
  icon: string;
  name: string;
  description: string;
  progress: number;        // 0–100
  tags?: string[];
  topicsCount?: number;
  color?: SubjectColor;
  onClick?: () => void;
  onMenuClick?: () => void;
};

// ─── Color config ─────────────────────────────────────────────────────────────

const COLOR_MAP: Record<
  SubjectColor,
  {
    bar: string;           // gradient for top bar
    fill: string;          // gradient for progress fill
    pct: string;           // text color for percentage
    icon: string;          // icon bg
    iconBorder: string;    // icon border
  }
> = {
  green: {
    bar:         "linear-gradient(90deg, #4fffb0, #00e5ff)",
    fill:        "linear-gradient(90deg, #4fffb0, #00e5ff)",
    pct:         "#4fffb0",
    icon:        "rgba(79,255,176,0.1)",
    iconBorder:  "rgba(79,255,176,0.15)",
  },
  blue: {
    bar:         "linear-gradient(90deg, #63a0ff, #a78bff)",
    fill:        "linear-gradient(90deg, #63a0ff, #a78bff)",
    pct:         "#63a0ff",
    icon:        "rgba(99,160,255,0.1)",
    iconBorder:  "rgba(99,160,255,0.15)",
  },
  purple: {
    bar:         "linear-gradient(90deg, #a78bff, #ff6eb4)",
    fill:        "linear-gradient(90deg, #a78bff, #ff6eb4)",
    pct:         "#a78bff",
    icon:        "rgba(167,139,255,0.1)",
    iconBorder:  "rgba(167,139,255,0.15)",
  },
  orange: {
    bar:         "linear-gradient(90deg, #ffb347, #ff6b6b)",
    fill:        "linear-gradient(90deg, #ffb347, #ff6b6b)",
    pct:         "#ffb347",
    icon:        "rgba(255,179,71,0.1)",
    iconBorder:  "rgba(255,179,71,0.15)",
  },
  cyan: {
    bar:         "linear-gradient(90deg, #00e5ff, #4fffb0)",
    fill:        "linear-gradient(90deg, #00e5ff, #4fffb0)",
    pct:         "#00e5ff",
    icon:        "rgba(0,229,255,0.1)",
    iconBorder:  "rgba(0,229,255,0.15)",
  },
  pink: {
    bar:         "linear-gradient(90deg, #ff6eb4, #ffb347)",
    fill:        "linear-gradient(90deg, #ff6eb4, #ffb347)",
    pct:         "#ff6eb4",
    icon:        "rgba(255,110,180,0.1)",
    iconBorder:  "rgba(255,110,180,0.15)",
  },
};

// ─── SubjectCard ──────────────────────────────────────────────────────────────

export function SubjectCard({
  icon,
  name,
  description,
  progress,
  tags = [],
  topicsCount = 0,
  color = "green",
  onClick,
  onMenuClick,
}: SubjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const c = COLOR_MAP[color];
  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        relative flex flex-col gap-4 p-6 rounded-2xl cursor-pointer
        bg-[#111620] border border-[#1e2530] overflow-hidden
        transition-all duration-300
      "
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        borderColor: hovered ? "#2a3545" : "#1e2530",
        background: hovered ? "#151c28" : "#111620",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Color top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{
          background: c.bar,
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.2s",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0"
          style={{ background: c.icon, border: `1px solid ${c.iconBorder}` }}
        >
          {icon}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onMenuClick?.(); }}
          className="
            text-lg text-[#5a6478] bg-transparent border-none cursor-pointer
            px-1 py-0.5 rounded-md transition-all duration-200
            hover:text-[#e8eaf0]
          "
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s, color 0.2s" }}
        >
          ⋯
        </button>
      </div>

      {/* Title + desc */}
      <div>
        <p
          className="text-base font-bold tracking-tight text-[#e8eaf0] mb-1"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}
        >
          {name}
        </p>
        <p
          className="text-xs text-[#5a6478] leading-relaxed line-clamp-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {description}
        </p>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] text-[#5a6478]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Progreso del temario
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: c.pct, fontFamily: "'Syne', sans-serif" }}
          >
            {pct}%
          </span>
        </div>

        {/* Bar */}
        <div className="h-1 bg-[#1e2530] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: c.fill }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-1 border-t border-[#1e2530]"
      >
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                text-[10px] font-medium text-[#5a6478]
                border border-[#1e2530] rounded-full px-2 py-0.5
              "
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="text-[11px] text-[#5a6478] whitespace-nowrap"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          📝 {topicsCount} temas
        </span>
      </div>
    </div>
  );
}

// ─── AddSubjectCard ───────────────────────────────────────────────────────────

export type AddSubjectCardProps = {
  onClick?: () => void;
};

export function AddSubjectCard({ onClick }: AddSubjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        flex flex-col items-center justify-center gap-3 p-6 rounded-2xl
        bg-transparent text-left w-full cursor-pointer h-full
        transition-all duration-300
      "
      style={{
        border: `2px dashed ${hovered ? "rgba(79,255,176,0.4)" : "#1e2530"}`,
        background: hovered ? "rgba(79,255,176,0.03)" : "transparent",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Plus icon */}
      <div
        className="w-13 h-13 rounded-[14px] flex items-center justify-center text-2xl transition-all duration-200"
        style={{
          width: 52, height: 52,
          background: hovered ? "rgba(79,255,176,0.07)" : "#111620",
          border: `1px solid ${hovered ? "rgba(79,255,176,0.25)" : "#1e2530"}`,
          color: hovered ? "#4fffb0" : "#5a6478",
        }}
      >
        +
      </div>

      <div className="text-center">
        <p
          className="text-sm font-bold transition-colors duration-200"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? "#4fffb0" : "#7a8499",
          }}
        >
          Nueva materia
        </p>
        <p
          className="text-xs text-[#5a6478] leading-relaxed mt-1 max-w-[150px]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Agrega una materia y empieza a planificar con IA
        </p>
      </div>
    </button>
  );
}

export default SubjectCard;