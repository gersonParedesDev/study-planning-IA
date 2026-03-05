// ─── Types ───────────────────────────────────────────────────────────────────

export type StatCardProps = {
  icon: string;
  value: string | number;
  label: string;
  trend?: string;
};

// ─── StatCard ─────────────────────────────────────────────────────────────────

export function StatCard({ icon, value, label, trend }: StatCardProps) {
  return (
    <div
      className="
        flex flex-col gap-3 p-5
        bg-[#111620] border border-[#1e2530] rounded-2xl
        transition-all duration-200 hover:border-[#2a3545]
        cursor-default select-none
      "
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div
          className="
            w-9 h-9 rounded-[9px] text-base
            flex items-center justify-center
            bg-[rgba(79,255,176,0.07)] border border-[rgba(79,255,176,0.1)]
          "
        >
          {icon}
        </div>

        {/* Trend badge */}
        {trend && (
          <span
            className="
              text-[11px] font-medium text-[#4fffb0]
              bg-[rgba(79,255,176,0.08)] px-2 py-0.5 rounded-full
            "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {trend}
          </span>
        )}
      </div>

      {/* Value + label */}
      <div>
        <p
          className="text-[28px] font-extrabold leading-none tracking-tight text-[#e8eaf0]"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}
        >
          {value}
        </p>
        <p
          className="text-xs text-[#5a6478] mt-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

// ─── StatCardGrid ─────────────────────────────────────────────────────────────

export type StatCardGridProps = {
  cards: StatCardProps[];
};

export function StatCardGrid({ cards }: StatCardGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}

export default StatCard;