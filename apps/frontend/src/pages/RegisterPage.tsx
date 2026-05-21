import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth.service'; 
import { ThemeToggle, useTheme } from '../components/toggles/toogleColor';
import { User as UserIcon, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<'FREE' | 'PRO'>('FREE');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPasswordScore = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const score = getPasswordScore(password);
  const strengthLabels = ['Ingresa una contraseña', 'Débil', 'Moderada', 'Fuerte', 'Muy segura'];
  
  const getSegmentColor = (index: number) => {
    if (index >= score) return 'bg-study-border/40';
    if (score === 1) return 'bg-[#ff4d6d]';
    if (score === 2) return 'bg-[#f9c74f]';
    return 'bg-study-accent';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      await registerUser({ 
        firstName, 
        lastName, 
        email, 
        password, 
        plan
      });
      navigate('/login');

    } catch (err:any) {
      setError(err.message || 'Error al crear la cuenta. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-study-bg font-inter text-study-text overflow-hidden selection:bg-study-accent/30">
      
      {/* PANEL IZQUIERDO: Formulario */}
      <div className="w-full lg:w-[52%] flex flex-col items-center justify-center p-8 lg:p-12 overflow-y-auto relative">
        {/* Botón de Tema (Móvil/Desktop) */}
        <div className="absolute top-6 left-6 lg:left-12">
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        <div className="w-full max-w-[440px] py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="flex items-center gap-3.5 mb-10 group cursor-pointer w-fit">
            <div className="w-10 h-10 bg-study-accent rounded-xl flex items-center justify-center font-syne font-extrabold text-study-bg shadow-lg shadow-study-accent/20 group-hover:rotate-12 transition-transform duration-300">S·A</div>
            <span className="font-syne font-bold text-xl tracking-tight">Study<span className="text-study-accent">AI</span></span>
          </div>

          <div className="mb-10">
            <h2 className="font-syne text-4xl font-bold tracking-tight mb-3 text-study-text">Empieza ahora</h2>
            <p className="text-study-muted font-medium">
              ¿Ya tienes cuenta? <Link to="/login" className="text-study-accent hover:underline decoration-2 underline-offset-4 transition-all">Inicia sesión</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row: Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[2px] text-study-muted mb-2 block ml-1 transition-colors group-focus-within:text-study-accent">Nombre</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">
                    <UserIcon size={16} />
                  </div>
                  <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Juan" className="w-full bg-study-card border-2 border-study-border rounded-2xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-study-accent focus:bg-study-surface transition-all" />
                </div>
              </div>
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-[2px] text-study-muted mb-2 block ml-1 transition-colors group-focus-within:text-study-accent">Apellido</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">
                    <UserIcon size={16} />
                  </div>
                  <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="García" className="w-full bg-study-card border-2 border-study-border rounded-2xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-study-accent focus:bg-study-surface transition-all" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="text-[10px] font-bold uppercase tracking-[2px] text-study-muted mb-2 block ml-1 transition-colors group-focus-within:text-study-accent">Correo electrónico</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">
                  <Mail size={16} />
                </div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="w-full bg-study-card border-2 border-study-border rounded-2xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-study-accent focus:bg-study-surface transition-all" />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="text-[10px] font-bold uppercase tracking-[2px] text-study-muted mb-2 block ml-1 transition-colors group-focus-within:text-study-accent">Contraseña</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">
                  <Lock size={16} />
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mín. 8 caracteres" className="w-full bg-study-card border-2 border-study-border rounded-2xl py-3.5 pl-10 pr-4 text-sm font-medium outline-none focus:border-study-accent focus:bg-study-surface transition-all" />
              </div>
              
              <div className="flex gap-1.5 mt-3 px-1">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className={`flex-1 h-1 rounded-full transition-colors duration-500 ${getSegmentColor(index)}`}></div>
                ))}
              </div>
              <div className="text-[11px] font-bold text-study-muted/60 mt-2 ml-1 flex items-center gap-1.5 uppercase tracking-wider">
                {password.length > 0 && <span className="w-1 h-1 rounded-full bg-study-muted/40"></span>}
                {password.length === 0 ? strengthLabels[0] : strengthLabels[score]}
              </div>
            </div>

            {/* Selector de Plan */}
            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase tracking-[2px] text-study-muted mb-4 block ml-1">Plan de estudios</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${plan === 'FREE' ? 'border-study-accent bg-study-accent/5 ring-4 ring-study-accent/5' : 'border-study-border bg-study-card hover:border-study-accent/30'}`}>
                  <input type="radio" name="plan" value="FREE" checked={plan === 'FREE'} onChange={() => setPlan('FREE')} className="hidden" />
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[13px] font-bold uppercase tracking-tight ${plan === 'FREE' ? 'text-study-accent' : 'text-study-text'}`}>Gratis</span>
                    {plan === 'FREE' && <CheckCircle2 size={14} className="text-study-accent" />}
                  </div>
                  <div className="text-lg font-bold font-syne text-study-text">$0</div>
                  <p className="text-[10px] text-study-muted font-medium mt-1 leading-tight">5 resúmenes/mes</p>
                </label>

                <label className={`relative border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${plan === 'PRO' ? 'border-study-accent bg-study-accent/5 ring-4 ring-study-accent/5' : 'border-study-border bg-study-card hover:border-study-accent/30'}`}>
                  <input type="radio" name="plan" value="PRO" checked={plan === 'PRO'} onChange={() => setPlan('PRO')} className="hidden" />
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[13px] font-bold uppercase tracking-tight ${plan === 'PRO' ? 'text-study-accent' : 'text-study-text'}`}>Pro</span>
                    {plan === 'PRO' && <CheckCircle2 size={14} className="text-study-accent" />}
                  </div>
                  <div className="text-lg font-bold font-syne text-study-text">$9</div>
                  <p className="text-[10px] text-study-muted font-medium mt-1 leading-tight">IA Ilimitada</p>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-medium animate-shake">
                ⚠️ {error}
              </div>
            )}

            <label className="flex items-start gap-3 py-2 cursor-pointer select-none group/check">
              <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="hidden peer" />
              <div className="w-5 h-5 border-2 border-study-border bg-study-card rounded-lg peer-checked:bg-study-accent peer-checked:border-study-accent flex items-center justify-center transition-all group-hover:border-study-accent/50 shrink-0">
                <span className="text-study-bg font-bold text-[10px] hidden peer-checked:block">✓</span>
              </div>
              <span className="text-[13px] text-study-muted font-medium leading-tight pt-0.5">
                Acepto los <a href="#" className="text-study-accent font-bold hover:underline">Términos</a> y la <a href="#" className="text-study-accent font-bold hover:underline">Política de privacidad</a>
              </span>
            </label>

            <button type="submit" disabled={isLoading} className="w-full bg-study-accent text-study-bg font-bold py-4.5 rounded-2xl text-[15px] tracking-wide hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-50 shadow-lg shadow-study-accent/25 flex items-center justify-center gap-2 cursor-pointer group">
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-study-bg/30 border-t-study-bg rounded-full animate-spin"></span>
              ) : (
                <>
                  Crear cuenta gratis
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-study-border/60"></div>
            <span className="text-[10px] text-study-muted font-bold uppercase tracking-[2px]">o regístrate con</span>
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

      {/* PANEL DERECHO: Visuales y Features */}
      <div className="hidden lg:flex w-[48%] relative flex-col justify-center p-12 lg:p-20 bg-study-surface overflow-hidden border-l border-study-border/30">
        {/* Grilla Animada */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(var(--theme-accent) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--theme-accent) 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }}></div>
        
        {/* Orbes */}
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full blur-[100px] bg-study-accent/10"></div>
        <div className="absolute top-16 -right-10 w-[350px] h-[350px] rounded-full blur-[100px] bg-blue-500/10"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-study-accent/5 border border-study-accent/20 rounded-full text-[10px] font-bold tracking-[2px] uppercase text-study-accent mb-9">
            ¿Por qué StudyAI?
          </div>
          
          <h2 className="font-syne text-5xl font-extrabold leading-[1.1] tracking-tighter mb-8">
            Tu ventaja competitiva<br />en el <span className="text-study-accent">estudio.</span>
          </h2>
          
          <p className="text-study-muted text-lg font-light leading-relaxed max-w-[440px] mb-12">
            Diseñado para estudiantes que quieren resultados excepcionales con un sistema inteligente y organizado.
          </p>

          <div className="grid grid-cols-1 gap-5">
            {[
              { icon: '🧠', title: 'Resúmenes Pro', desc: 'Sube tus PDFs y recibe una síntesis perfecta en segundos.' },
              { icon: '❓', title: 'Quizzes IA', desc: 'Evalúa tu conocimiento con preguntas generadas por nuestra IA.' },
              { icon: '📅', title: 'Planificador', desc: 'Organiza tus sesiones de estudio basándote en tus fechas de examen.' }
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-5 p-6 bg-study-bg/40 backdrop-blur-sm border border-study-border/50 rounded-2xl hover:border-study-accent/30 hover:bg-study-accent/5 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 bg-study-accent/10 border border-study-accent/10 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <div>
                  <div className="font-syne text-base font-bold mb-1 tracking-tight text-study-text">{feat.title}</div>
                  <div className="text-[13px] text-study-muted font-medium leading-relaxed">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
