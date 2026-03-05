import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export const LoginPage = () => {
  const { handleLogin, error: authError, loading } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, ] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  return (
    <div className="flex min-h-screen bg-study-bg font-dm text-[#e8eaf0] overflow-hidden">
      
      {/* PANEL IZQUIERDO: Visual Hero */}
      <div className="hidden lg:flex w-[52%] relative flex-col justify-between p-12 bg-study-surface overflow-hidden">
        {/* Grilla Animada */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#4fffb0 1px, transparent 1px), linear-gradient(90deg, #4fffb0 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}></div>
        
        {/* Orbes de Luz */}
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full blur-[80px] bg-study-accent/10 animate-pulse"></div>
        <div className="absolute bottom-12 -right-12 w-[300px] h-[300px] rounded-full blur-[80px] bg-blue-500/10 animate-pulse delay-1000"></div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-study-accent rounded-lg flex items-center justify-center font-syne font-extrabold text-study-bg">S·A</div>
            <span className="font-syne font-bold text-lg tracking-tight">Study<span className="text-study-accent">AI</span></span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-study-accent/25 rounded-full text-[11px] font-medium tracking-[1.5px] uppercase text-study-accent mb-7">
            <span className="w-1.5 h-1.5 bg-study-accent rounded-full animate-ping"></span>
            Plataforma de estudio inteligente
          </div>
          <h1 className="font-syne text-5xl xl:text-6xl font-extrabold leading-[1.05] tracking-tighter mb-5">
            Aprende<br />más rápido<br /><span className="text-study-accent">con IA.</span>
          </h1>
          <p className="text-study-muted text-base font-light leading-relaxed max-w-[380px]">
            Resúmenes automáticos, quizzes adaptativos y planificación personalizada. Tu asistente de estudio definitivo.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div>
              <div className="font-syne text-3xl font-bold">94%</div>
              <div className="text-[12px] text-study-muted">tasa de aprobación</div>
            </div>
            <div className="w-px bg-study-border h-full"></div>
            <div>
              <div className="font-syne text-3xl font-bold">3×</div>
              <div className="text-[12px] text-study-muted">más eficiente</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[12px] text-study-muted">
          © 2026 StudyAI — Todos los derechos reservados
        </div>
      </div>

      {/* PANEL DERECHO: Formulario */}
      <div className="w-full lg:w-[48%] flex items-center justify-center p-8 bg-study-bg relative">
        <div className="w-full max-w-[380px] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="mb-9">
            <h2 className="font-syne text-3xl font-bold tracking-tight mb-2">Bienvenido de nuevo</h2>
            <p className="text-sm text-study-muted">
              ¿No tienes cuenta? <Link to="/register" className="text-study-accent hover:opacity-70 transition-opacity">Registrate gratis</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6 mb-7">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium uppercase tracking-wider text-study-muted">Correo electrónico</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">✉</span>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-study-card border border-study-border rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:border-study-accent focus:bg-study-surface transition-all placeholder:text-[#2d3545]"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium uppercase tracking-wider text-study-muted">Contraseña</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">🔒</span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-study-card border border-study-border rounded-xl py-3.5 pl-11 pr-11 text-sm outline-none focus:border-study-accent focus:bg-study-surface transition-all placeholder:text-[#2d3545]"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-study-muted hover:text-white p-1"
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>
            </div>

            {(error || authError) && <p className="text-red-400 text-xs mb-4 text-center">{error || authError}</p>}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 text-[13px] text-study-muted cursor-pointer select-none">
                <input type="checkbox" className="hidden peer" />
                <div className="w-4 h-4 border border-study-border bg-study-card rounded peer-checked:bg-study-accent peer-checked:border-study-accent flex items-center justify-center transition-all">
                  <span className="text-study-bg font-bold text-[10px] hidden peer-checked:block">✓</span>
                </div>
                Recordarme
              </label>
              <a href="#" className="text-[13px] text-study-accent font-medium hover:opacity-70 transition-opacity">¿Olvidaste tu contraseña?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-study-accent text-study-bg font-semibold py-4 rounded-xl text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-study-border"></div>
            <span className="text-[11px] text-study-muted uppercase tracking-[1px]">o continúa con</span>
            <div className="flex-1 h-px bg-study-border"></div>
          </div>

          <button className="w-full bg-study-card border border-study-border rounded-xl py-3 flex items-center justify-center gap-3 text-sm hover:bg-study-surface hover:border-study-accent/30 transition-all">
            <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-[10px]">G</div>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};