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
      className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#111620] transition-all duration-200"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium text-[#080b10] flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #4fffb0, #63a0ff)' }}
      >
        {initials}
      </div>
      {!collapsed && (
        <div className="flex-1 text-left overflow-hidden">
          <div className="text-xs text-[#e8eaf0] truncate">{user?.firstname}</div>
          <div className="text-[10px] text-[#5a6478] truncate">
            {user?.plan?.toUpperCase()} · {user?.university ?? 'Sin universidad'}
          </div>
        </div>
      )}
    </button>
  );
}