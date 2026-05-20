import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { ThemeToggle, useTheme } from '../components/toggles/toogleColor';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { handleLogin, error: authError, loading } = useLogin();
  const { theme, toggle } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  return (
    <div className="flex min-h-screen bg-study-bg font-inter text-study-text overflow-hidden selection:bg-study-accent/30">

      {/* PANEL IZQUIERDO: Visual Hero */}
      <div className="hidden lg:flex w-[52%] relative flex-col justify-between p-12 bg-study-surface overflow-hidden border-r border-study-border/30">
        {/* Grilla Animada */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(var(--theme-accent) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--theme-accent) 1.5px, transparent 1.5px)', 
               backgroundSize: '50px 50px' 
             }}></div>

        {/* Orbes de Luz Dinámicos */}
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[100px] bg-study-accent/15 animate-pulse"></div>
        <div className="absolute bottom-12 -right-12 w-[400px] h-[400px] rounded-full blur-[100px] bg-blue-500/10 animate-pulse delay-700"></div>

        {/* Logo & Toggle */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-10 h-10 bg-study-accent rounded-xl flex items-center justify-center font-syne font-extrabold text-study-bg shadow-lg shadow-study-accent/20 group-hover:scale-110 transition-transform duration-300">S·A</div>
            <span className="font-syne font-bold text-xl tracking-tight">Study<span className="text-study-accent">AI</span></span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-study-accent/20 bg-study-accent/5 rounded-full text-[12px] font-semibold tracking-wide uppercase text-study-accent mb-9">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-study-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-study-accent"></span>
            </span>
            Plataforma de estudio inteligente
          </div>

          <h1 className="font-syne text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-tighter mb-8 bg-gradient-to-br from-study-text to-study-text/60 bg-clip-text text-transparent">
            Aprende<br />más rápido<br /><span className="text-study-accent">con IA.</span>
          </h1>

          <p className="text-study-muted text-lg font-light leading-relaxed max-w-[420px] mb-12">
            Domina tus materias con resúmenes inteligentes, quizzes que se adaptan a ti y un plan de estudio que realmente funciona.
          </p>

          {/* Stats con Glassmorphism */}
          <div className="flex items-center gap-10 p-6 bg-study-bg/40 backdrop-blur-md rounded-2xl border border-study-border/50 inline-flex">
            <div>
              <div className="font-syne text-4xl font-bold text-study-text tracking-tight">94%</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-study-muted mt-1">Éxito</div>
            </div>
            <div className="w-px bg-study-border/60 h-10"></div>
            <div>
              <div className="font-syne text-4xl font-bold text-study-text tracking-tight">3×</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-study-muted mt-1">Velocidad</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[12px] font-medium text-study-muted/60 tracking-wide">
          © 2026 STUDYAI — DISEÑADO PARA EL FUTURO DEL APRENDIZAJE
        </div>
      </div>

      {/* PANEL DERECHO: Formulario */}
      <div className="w-full lg:w-[48%] flex items-center justify-center p-8 bg-study-bg relative">
        {/* Botón de Tema (Móvil) */}
        <div className="absolute top-6 right-6 lg:hidden">
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-8 duration-700">

          {/* Logo visible solo en móvil */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-9 h-9 bg-study-accent rounded-lg flex items-center justify-center font-syne font-extrabold text-study-bg">S·A</div>
            <span className="font-syne font-bold text-lg tracking-tight text-study-text">StudyAI</span>
          </div>

          <div className="mb-10">
            <h2 className="font-syne text-4xl font-bold tracking-tight mb-3 text-study-text">Bienvenido</h2>
            <p className="text-study-muted font-medium">
              ¿No tienes cuenta? <Link to="/register" className="text-study-accent hover:underline decoration-2 underline-offset-4 transition-all">Crea una gratis</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email Field */}
            <div className="group">
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-study-muted mb-2.5 block ml-1 transition-colors group-focus-within:text-study-accent">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">
                  <Mail size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-study-card border-2 border-study-border rounded-2xl py-4 pl-12 pr-4 text-[15px] font-medium outline-none focus:border-study-accent focus:bg-study-surface placeholder:text-study-muted/30 transition-all shadow-sm focus:shadow-study-accent/5"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-study-muted mb-2.5 block ml-1 transition-colors group-focus-within:text-study-accent">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-study-card border-2 border-study-border rounded-2xl py-4 pl-12 pr-12 text-[15px] font-medium outline-none focus:border-study-accent focus:bg-study-surface placeholder:text-study-muted/30 transition-all shadow-sm focus:shadow-study-accent/5"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-study-muted hover:text-study-accent p-1.5 rounded-lg hover:bg-study-accent/10 transition-all cursor-pointer"
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {(authError) && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-medium">
                ⚠️ {authError}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-3 text-[14px] text-study-muted cursor-pointer select-none group/check">
                <input type="checkbox" className="hidden peer" />
                <div className="w-5 h-5 border-2 border-study-border bg-study-card rounded-lg peer-checked:bg-study-accent peer-checked:border-study-accent flex items-center justify-center transition-all group-hover:border-study-accent/50">
                  <span className="text-study-bg font-bold text-[10px] hidden peer-checked:block">✓</span>
                </div>
                Recordarme
              </label>
              <a href="#" className="text-[13px] text-study-accent font-semibold hover:opacity-70 transition-opacity">¿Olvidaste tu contraseña?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-study-accent text-study-bg font-bold py-4.5 rounded-2xl text-[15px] tracking-wide hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-50 shadow-lg shadow-study-accent/25 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-study-bg/30 border-t-study-bg rounded-full animate-spin"></span>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-study-border/60"></div>
            <span className="text-[10px] text-study-muted font-bold uppercase tracking-[2px]">o accede con</span>
            <div className="flex-1 h-px bg-study-border/60"></div>
          </div>

          <button className="w-full bg-study-card border-2 border-study-border rounded-2xl py-3.5 flex items-center justify-center gap-3 text-[14px] font-bold hover:bg-study-surface hover:border-study-accent/20 transition-all cursor-pointer group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};