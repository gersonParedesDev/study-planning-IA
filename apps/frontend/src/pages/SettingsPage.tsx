import { Sidebar } from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useSubjects } from '../hooks/useSubjects';
import { ThemeToggle, useTheme } from '../components/toggles/toogleColor';
import { Settings as SettingsIcon, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { subjects } = useSubjects();
  const { theme, toggle } = useTheme();

  return (
    <>
      <Sidebar subjectCount={subjects.length} />

      <main
        className="min-h-screen bg-study-bg transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: 'var(--sidebar-width)', padding: '32px 48px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-study-surface border border-study-border flex items-center justify-center text-study-accent">
            <SettingsIcon size={20} />
          </div>
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-study-text">
              Configuración
            </h1>
            <p className="text-sm text-study-muted">
              Gestiona tus preferencias y personaliza tu experiencia.
            </p>
          </div>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Appearance Section */}
          <section className="p-6 rounded-2xl bg-study-card border border-study-border">
            <div className="flex items-center gap-2 mb-6">
              <Palette size={18} className="text-study-accent" />
              <h2 className="text-[16px] font-semibold text-study-text uppercase tracking-wider">
                Apariencia
              </h2>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-study-border/50">
              <div>
                <p className="text-[15px] font-medium text-study-text">
                  Tema de la aplicación
                </p>
                <p className="text-[13px] text-study-muted">
                  Cambia entre modo claro y oscuro.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-study-surface px-4 py-2 rounded-lg border border-study-border">
                <span className="text-xs font-bold text-study-muted uppercase tracking-widest">
                  {theme === 'light' ? 'Claro' : 'Oscuro'}
                </span>
                <ThemeToggle theme={theme} onToggle={toggle} />
              </div>
            </div>
          </section>

          {/* Account Info (Placeholder) */}
          <section className="p-6 rounded-2xl bg-study-card border border-study-border opacity-60">
             <h2 className="text-[16px] font-semibold text-study-text uppercase tracking-wider mb-4">
                Cuenta
              </h2>
              <div className="flex flex-col gap-1">
                 <p className="text-[14px] text-study-text">{user?.firstname} {user?.lastname}</p>
                 <p className="text-[12px] text-study-muted">{user?.email}</p>
              </div>
          </section>
        </div>
      </main>
    </>
  );
}
