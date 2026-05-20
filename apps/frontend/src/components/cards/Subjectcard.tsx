import { useState } from 'react';
import { COLOR_MAP, type SubjectColor } from '../../styles/colors';
import { useUpdateSubject } from '../../hooks/useUpdateSubject';
import { Pencil, Trash2 } from 'lucide-react';

export type { SubjectColor };

export type SubjectCardProps = {
  id: string; // Required for updates
  name: string;
  description?: string;
  progress?: number;
  area?: string;
  examDaysLeft?: number | null;
  color?: SubjectColor;
  onClick?: () => void;
  onMenuClick?: () => void;
  onUpdate?: (name: string, description: string) => void;
};

export function SubjectCard({
  id,
  name: initialName,
  description: initialDescription,
  progress = 0,
  area,
  examDaysLeft,
  color, // No default color, uses theme standard
  onClick,
  onMenuClick,
  onUpdate,
}: SubjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription || '');

  const { editSubject} = useUpdateSubject();

  // If color prop is provided, use the map; otherwise use standard theme variables
  const c = color ? COLOR_MAP[color] : {
    bg: 'var(--theme-card)',
    text: 'var(--theme-text)',
    border: 'rgba(128, 128, 128, 0.2)'
  };
  
  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  const handleSave = async (e?: React.FocusEvent | React.KeyboardEvent | React.MouseEvent) => {
    e?.stopPropagation();
    
    // Si no ha cambiado nada o ya estamos guardando, simplemente cerramos edición
    if (!isEditing) return;

    if (name === initialName && description === (initialDescription || '')) {
      setIsEditing(false);
      return;
    }

    const prevName = initialName;
    const prevDesc = initialDescription;

    setIsEditing(false);
    
    try {
      // Usamos los valores actuales del estado
      const updated = await editSubject(id, { name, description });
      if (updated) {
        onUpdate?.(updated.name, updated.description || '');
      }
    } catch (err) {
      setName(prevName);
      setDescription(prevDesc || '');
      alert('Error al guardar cambios.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave(e);
    }
    if (e.key === 'Escape') {
      setName(initialName);
      setDescription(initialDescription || '');
      setIsEditing(false);
    }
  };

  const toggleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };


  const examColor =
    examDaysLeft === null || examDaysLeft === undefined ? '#787774'
    : examDaysLeft <= 30  ? '#cf222e'
    : examDaysLeft <= 60  ? '#bc4c00'
    : '#0b6e4f';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flat-card flex flex-col h-full cursor-pointer overflow-hidden"
      style={{ 
        background: hovered ? `color-mix(in srgb, ${c.bg}, var(--theme-text) 5%)` : c.bg,
        borderColor: hovered ? '#ffffff' : 'rgba(128, 128, 128, 0.2)',
        boxShadow: hovered ? '0 0 15px rgba(255, 255, 255, 0.1)' : 'none'
      }}
    >
      <div className="p-5 flex flex-col h-full gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-study-border/50">
          {area && (
            <span
              className="text-[11px] font-medium rounded-[4px] px-2 py-0.5 bg-study-surface text-study-muted border border-study-border"
            >
              {area}
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onMenuClick?.(); }}
            className="cursor-pointer p-1.5 rounded-md text-study-muted hover:text-red-500 hover:bg-red-500/10 transition-colors ml-auto"
            style={{ opacity: hovered && !isEditing ? 1 : 0 }}
            title="Eliminar materia"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Name + description */}
        <div className="flex-1 flex flex-col gap-2">
          {isEditing ? (
            <div 
              className="flex flex-col gap-2" 
              onBlur={(e) => {
                // Solo guardamos si el foco se mueve fuera del contenedor de edición
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  handleSave();
                }
              }}
            >
              <div className="relative">
                <input
                  autoFocus
                  className="text-[15px] font-bold bg-transparent border-b border-study-accent outline-none w-full pr-5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-study-accent/50">
                  <Pencil size={12} />
                </div>
              </div>
              <textarea
                className="text-[13px] bg-transparent border-b border-study-border outline-none w-full resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    // En el textarea, Enter guarda, Shift+Enter hace nueva línea
                    e.preventDefault();
                    handleSave();
                  } else if (e.key === 'Escape') {
                    setName(initialName);
                    setDescription(initialDescription || '');
                    setIsEditing(false);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                rows={2}
              />
            </div>
          ) : (
            <div 
              className="flex-1 flex flex-col gap-2 cursor-text group/text" 
              onClick={toggleEdit}
            >
              <p className="text-[15px] font-bold text-study-text leading-tight">
                {name}
              </p>
              {description && (
                <p className="text-[13px] text-study-muted leading-snug line-clamp-2">
                  {description}
                </p>
              )}
              {!description && (
                <p className="text-[13px] text-study-muted italic opacity-0 group-hover/text:opacity-50 transition-opacity">
                  Añadir descripción...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 pt-4">
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="progress-bar-container flex-1">
              <div
                className="progress-bar-fill transition-all duration-500"
                style={{ width: `${pct}%`}}
              />
            </div>
            <span className="text-[12px] font-bold">
              {pct}%
            </span>
          </div>

          {/* Exam days */}
          {examDaysLeft !== undefined && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: examColor }}>
              <span>📅</span>
              <span>{examDaysLeft === null ? 'Sin fecha' : `${examDaysLeft} días para el examen`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
