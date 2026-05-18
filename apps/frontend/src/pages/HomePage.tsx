// src/pages/HomePage.tsx
import { useState, useMemo } from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { AddSubjectModal } from '../components/modals/AddSubjectModal';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import { useSubjects } from '../hooks/useSubjects';
import { useDeleteSubject } from '../hooks/useDeleteSubject';
import { PATHS } from '../routes/paths';
import { StatCard } from '../components/cards/Statcard';
import { SubjectCard } from '../components/cards/Subjectcard';
import AddCard from '../components/cards/Addcard';
import { ThemeToggle, useTheme } from '../components/toggles/toogleColor';

function getTodayLabel() {
  return new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getDaysLeft(examDate?: string | null): number | null {
  if (!examDate) return null;
  const diff = new Date(examDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const QUOTES = [
  { text: '"La teoría de probabilidad es, en el fondo, solo sentido común reducido a cálculo."', author: 'Laplace' },
  { text: '"Un algoritmo debe ser visto para ser creído."', author: 'Knuth' },
  { text: '"Las matemáticas son el lenguaje en que está escrito el universo."', author: 'Galileo' },
  { text: '"El conocimiento es poder."', author: 'Francis Bacon' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subjects, loading, error, refetch } = useSubjects();
  const { handleDelete, loading: deleting } = useDeleteSubject();
  const { theme, toggle } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  const avgProgress = subjects.length
    ? Math.round(subjects.reduce((acc) => acc + 0, 0) / subjects.length)
    : 0;

  async function confirmDelete() {
    if (!subjectToDelete) return;
    const ok = await handleDelete(subjectToDelete);
    if (ok) {
      setDeleteModalOpen(false);
      setSubjectToDelete(null);
      refetch();
    }
  }

  return (
    <>
      <Sidebar subjectCount={subjects.length} />

      <main
        className="min-h-screen bg-study-bg transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: 'var(--sidebar-width)', padding: '32px 48px' }}
      >
        {/* ── Top bar ── */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div
              className="text-[11px] font-medium uppercase tracking-wider mb-1.5"
              style={{ color: theme === 'light' ? '#787774' : '#9b978f' }}
            >
              {getTodayLabel()}
            </div>
            <h1
              className="text-[28px] font-bold tracking-tight"
              style={{ color: theme === 'light' ? '#37352f' : '#ececec' }}
            >
              Hola {user?.firstname}
            </h1>
          </div>

          {/* Toggle Color */}
          <div className="flex items-center gap-2 rounded-[4px] px-3 py-1.5">
            <span className="text-[12px] font-medium text-study-muted">
            </span>
            <ThemeToggle theme={theme} onToggle={toggle} />
          </div>
        </div>

        {/* ── Frase (Callout style) ── */}
        <div className="quote-box flex items-start gap-3 mb-8">
          <div className="text-[18px] leading-none mt-0.5">✨</div>
          <div className="flex-1">
            <p className="text-[14px] leading-relaxed mb-1 text-study-text">
              {quote.text}
            </p>
            <p className="text-[12px] text-study-muted font-medium">
              — {quote.author}
            </p>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <StatCard
            icon={BookOpen}
            value={subjects.length}
            label="Materias activas"
            variant="info"
          />
          <StatCard
            icon={CheckCircle}
            value={0}
            label="Finalizadas"
            variant="warning"
          />
          <StatCard
            icon={Clock}
            value={`${avgProgress}%`}
            label="Progreso general"
            variant="purple"
          />
        </div>

        {/* ── Subjects ── */}
        <div>
          <div className="flex items-center justify-between mb-5 border-b border-study-border pb-2">
            <h2 className="text-[16px] font-semibold text-study-text">
              Mis materias
            </h2>
            <button
              onClick={() => setModalOpen(true)}
              className="cursor-pointer text-[12px] font-medium px-3 py-1 rounded-[4px] border border-study-border hover:bg-study-surface transition-colors"
            >
              + Nueva materia
            </button>
          </div>

          {loading && (
            <p className="text-[14px] text-study-muted">Cargando materias...</p>
          )}

          {error && (
            <p className="text-[14px] text-red-500">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subjects.map((s) => (
                <div key={s.id} className="h-full">
                  <SubjectCard
                    id={s.id}
                    name={s.name}
                    description={s.description ?? undefined}
                    progress={0}
                    area={s.area_name ?? undefined}
                    examDaysLeft={getDaysLeft(s.exam_date)}
                    onClick={() => navigate(PATHS.SUBJECT_DETAIL.replace(':id', s.id))}
                    onMenuClick={() => {
                      setSubjectToDelete(s.id);
                      setDeleteModalOpen(true);
                    }}
                    onUpdate={() => refetch()}
                  />
                </div>
              ))}
              <div className="h-full min-h-[140px]">
                <AddCard onClick={() => setModalOpen(true)} />
              </div>
            </div>
          )}
        </div>
      </main>

      <AddSubjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => refetch()}
      />

      <ConfirmModal
        open={deleteModalOpen}
        title="Eliminar materia"
        description="¿Estás seguro que querés eliminar esta materia? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setSubjectToDelete(null);
        }}
      />
    </>
  );
}