import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { StatCardGrid, type StatCardProps } from "../components/cards/Statcard";
import { AddSubjectModal } from "../components/modals/AddSubjectModal";
import { useAuth } from "../context/AuthContext";
import { AddCard } from "../components/cards/Addcard";
import { useSubjects } from "../hooks/useSubjects";
import { SubjectCard, type SubjectColor } from "../components/cards/Subjectcard";
import { ConfirmModal } from "../components/modals/ConfirmModal";
import { useDeleteSubject } from "../hooks/useDeleteSubject";

const INITIAL_STATS: StatCardProps[] = [
  { icon: "📚", value: 6,      label: "Materias activas",      trend: "+1 nueva" },
  { icon: "✅", value: 84,     label: "Preguntas respondidas",  trend: "+12 hoy"  },
  { icon: "⏱️", value: "3.2h", label: "Estudiadas hoy",        trend: "↑ 20%"   },
  { icon: "🎯", value: "78%",  label: "Promedio general",       trend: "↑ 5pts"  },
];

const COLORS: SubjectColor[] = ["green", "blue", "purple", "orange", "cyan", "pink"];


export default function HomePage() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const { subjects, loading, refetch } = useSubjects();
  const { handleDelete, loading: deleting } = useDeleteSubject();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  async function confirmDelete() {
    if (!subjectToDelete) return;
    const ok = await handleDelete(subjectToDelete);
    if (ok) {
      setDeleteModalOpen(false);
      setSubjectToDelete(null);
      refetch(); // refresca la lista
    }
  }

  return (
    <>
      <Sidebar />

      <main className="min-h-screen px-12 py-10 ml-[68px]">

        {/* ── Top bar ── */}
        <div className="flex items-start justify-between mb-12 fadeup">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-widest uppercase text-[#5a6478] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] animate-pulse" />
              Jueves, 19 de Febrero
            </div>
            <h1 className="font-display text-[32px] font-extrabold tracking-[-1.2px] text-[#e8eaf0]">
              Hola,{" "}
              <span className="text-[#4fffb0]">{user?.firstname}</span>{" "}
              👋
            </h1>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="mb-12 fadeup [animation-delay:0.08s]">
          <StatCardGrid cards={INITIAL_STATS} />
        </div>

        {/* ── Subjects section ── */}
        <div className="fadeup [animation-delay:0.16s]">

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold tracking-[-0.5px] text-[#e8eaf0]">
                Mis materias
              </h2>
              <span className="text-xs text-[#5a6478] px-2.5 py-0.5 rounded-full bg-[#111620] border border-[#1e2530]">
                {subjects.length}
              </span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-sm text-[#5a6478]">Cargando materias...</p>
          )}

          {/* Grid */}
          {!loading && (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {subjects.map((s, i) => (
                <div
                  key={s.id}
                  className="fadeup h-full"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <SubjectCard
                    name={s.name}
                    description="Sin descripción aún."
                    icon="📖"
                    progress={0}
                    color={COLORS[i % COLORS.length]}
                    tags={[]}
                    topicsCount={0}
                    onMenuClick={() => {
                      setSubjectToDelete(s.id);
                      setDeleteModalOpen(true);
                    }}
                  />
                </div>
              ))}
              <div
                className="fadeup h-full min-h-[200px]"
                style={{ animationDelay: `${0.05 * subjects.length}s` }}
              >
                <AddCard title="Agregar materia" onClick={() => setModalOpen(true)} />
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
        description={`¿Estás seguro que querés eliminar esta materia? Esta acción no se puede deshacer.`}
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