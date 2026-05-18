import { Plus } from 'lucide-react';

type Props = {
  onClick?: () => void;
};

export default function AddCard({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flat-card w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-3 text-study-muted hover:text-study-text hover:bg-study-surface group"
    >
      <div className="w-10 h-10 rounded-full border border-study-border flex items-center justify-center group-hover:border-study-muted">
        <Plus size={20} />
      </div>
      <span className="text-[13px] font-medium">Nueva materia</span>
    </button>
  );
}
