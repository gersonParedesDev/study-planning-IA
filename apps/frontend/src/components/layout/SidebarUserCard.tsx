import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

type Props = {
  collapsed: boolean;
};

export function SidebarUserCard({ collapsed }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user
    ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase()
    : 'GJ';

  return (
    <button
      onClick={() => navigate(PATHS.PROFILE)}
      className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-study-surface transition-colors"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-study-bg flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, var(--theme-accent), #63a0ff)' }}
      >
        {initials}
      </div>
      {!collapsed && (
        <div className="flex-1 text-left overflow-hidden">
          <div className="text-xs text-study-text font-semibold truncate">{user?.firstname} {user?.lastname}</div>
          <div className="text-[9px] text-study-muted uppercase tracking-wider truncate font-medium">
            {user?.plan || 'FREE'} · {user?.university || 'Sin Universidad'}
          </div>
        </div>
      )}
    </button>
  );
}
