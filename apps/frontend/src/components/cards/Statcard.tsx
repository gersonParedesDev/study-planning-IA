import type { LucideIcon } from 'lucide-react';

type StatCardVariant = 'activity'| 'default' | 'warning' | 'danger' | 'info' | 'purple';

type Props = {
  icon: LucideIcon;
  value: string | number;
  label: string;
  sub?: string;
  variant?: StatCardVariant;
};

const VARIANT_STYLES: Record<StatCardVariant, {
  iconColor: string;
}> = {
  activity: {iconColor: '#ffffff'},
  default: { iconColor: '#37352f' },
  info:    { iconColor: '#0969da' },
  purple:  { iconColor: '#8250df' },
  warning: { iconColor: '#bc4c00' },
  danger:  { iconColor: '#cf222e' },
};

export function StatCard({ icon: Icon, value, label, sub, variant = 'default' }: Props) {
  const s = VARIANT_STYLES[variant];

  return (
    <div className="flat-card flex items-center gap-4 px-5 py-4">
      <div className="flex items-center justify-center flex-shrink-0">
        <Icon size={20} style={{ color: s.iconColor }} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[20px] font-bold leading-tight text-study-text">
          {value}
        </span>
        <span className="text-[12px] font-medium text-study-muted">
          {label}
        </span>
        {sub && (
          <span className="text-[11px] text-study-muted">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
