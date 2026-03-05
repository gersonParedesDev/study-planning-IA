import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth.service'; 

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<'free' | 'pro'>('free');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lógica de fortaleza de contraseña "Al estilo React"
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
    if (index >= score) return 'bg-study-border';
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
      console.log("¡Usuario registrado con éxito en la Base de Datos!");
      navigate('/login');

    } catch (err:any) {
      setError(err.message || 'Error al crear la cuenta. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-study-bg font-dm text-[#e8eaf0] overflow-hidden">
      
      {/* PANEL IZQUIERDO: Formulario */}
      <div className="w-full lg:w-[52%] flex flex-col items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          <a href="/" className="inline-flex items-center gap-2.5 mb-9 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-study-accent rounded-lg flex items-center justify-center font-syne font-extrabold text-[13px] text-study-bg tracking-tighter">S·A</div>
            <span className="font-syne font-bold text-[17px]">Study<span className="text-study-accent">AI</span></span>
          </a>

          <div className="mb-8">
            <h2 className="font-syne text-[28px] font-bold tracking-tight mb-2">Crea tu cuenta</h2>
            <p className="text-sm text-study-muted">
              ¿Ya tienes cuenta? <Link to="/login" className="text-study-accent hover:opacity-70 transition-opacity">Inicia sesion</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 mb-7">
              {/* Row: Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-study-muted">Nombre</label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">👤</span>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Juan" className="w-full bg-study-card border border-study-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-study-accent focus:bg-study-surface transition-all placeholder:text-[#2a3040]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-study-muted">Apellido</label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">👤</span>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="García" className="w-full bg-study-card border border-study-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-study-accent focus:bg-study-surface transition-all placeholder:text-[#2a3040]" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium uppercase tracking-wider text-study-muted">Correo electrónico</label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">✉</span>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="w-full bg-study-card border border-study-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-study-accent focus:bg-study-surface transition-all placeholder:text-[#2a3040]" />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium uppercase tracking-wider text-study-muted">Contraseña</label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-study-muted group-focus-within:text-study-accent transition-colors">🔒</span>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mín. 8 caracteres" className="w-full bg-study-card border border-study-border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-study-accent focus:bg-study-surface transition-all placeholder:text-[#2a3040]" />
                </div>
                
                {/* Indicador de fortaleza */}
                <div className="flex gap-1 mt-1">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className={`flex-1 h-[3px] rounded-[2px] transition-colors duration-300 ${getSegmentColor(index)}`}></div>
                  ))}
                </div>
                <div className="text-[11px] text-study-muted mt-0.5">
                  {password.length === 0 ? strengthLabels[0] : `Seguridad: ${strengthLabels[score]}`}
                </div>
              </div>
            </div>

            {/* Selector de Plan */}
            <div className="text-[11px] font-medium uppercase tracking-wider text-study-muted mb-2.5">Elige tu plan</div>
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {/* Plan Free */}
              <label className={`relative bg-study-card border rounded-xl p-4 cursor-pointer transition-all ${plan === 'free' ? 'border-study-accent bg-study-accent/5' : 'border-study-border hover:border-study-accent/30'}`}>
                <input type="radio" name="plan" value="free" checked={plan === 'free'} onChange={() => setPlan('free')} className="hidden" />
                <div className="font-syne text-sm font-bold mb-1">Gratuito</div>
                <div className="text-xl font-bold font-syne text-study-accent tracking-tight">$0 <span className="text-xs font-normal text-study-muted">/mes</span></div>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="text-[11px] text-study-muted flex items-center gap-1"><span className="text-study-accent text-[10px] font-bold">✓</span> 5 resúmenes/mes</div>
                  <div className="text-[11px] text-study-muted flex items-center gap-1"><span className="text-study-accent text-[10px] font-bold">✓</span> Quizzes básicos</div>
                </div>
              </label>

              {/* Plan Pro */}
              <label className={`relative bg-study-card border rounded-xl p-4 cursor-pointer transition-all ${plan === 'pro' ? 'border-study-accent bg-study-accent/5' : 'border-study-border hover:border-study-accent/30'}`}>
                <input type="radio" name="plan" value="pro" checked={plan === 'pro'} onChange={() => setPlan('pro')} className="hidden" />
                <div className="absolute -top-px right-2.5 bg-study-accent text-study-bg text-[9px] font-bold uppercase tracking-wider py-1 px-2 rounded-b-md">Popular</div>
                <div className="font-syne text-sm font-bold mb-1">Pro</div>
                <div className="text-xl font-bold font-syne text-study-accent tracking-tight">$9 <span className="text-xs font-normal text-study-muted">/mes</span></div>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="text-[11px] text-study-muted flex items-center gap-1"><span className="text-study-accent text-[10px] font-bold">✓</span> Resúmenes Ilimitados</div>
                  <div className="text-[11px] text-study-muted flex items-center gap-1"><span className="text-study-accent text-[10px] font-bold">✓</span> IA Avanzada</div>
                </div>
              </label>
            </div>

            {error && <p className="text-red-400 text-xs mb-4 text-center">{error}</p>}

            {/* Checkbox Términos */}
            <label className="flex items-start gap-2.5 mb-6 text-[13px] text-study-muted cursor-pointer select-none">
              <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="hidden peer" />
              <div className="w-[18px] h-[18px] border border-study-border bg-study-card rounded flex items-center justify-center shrink-0 mt-[1px] peer-checked:bg-study-accent peer-checked:border-study-accent transition-all">
                <span className="text-study-bg font-bold text-[11px] hidden peer-checked:block">✓</span>
              </div>
              <span>Acepto los <a href="#" className="text-study-accent hover:underline">Términos de servicio</a> y la <a href="#" className="text-study-accent hover:underline">Política de privacidad</a></span>
            </label>

            <button type="submit" disabled={isLoading} className="w-full bg-study-accent text-study-bg font-semibold py-4 rounded-xl text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 mb-4">
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta gratis →'}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-study-border"></div>
            <span className="text-[11px] text-study-muted uppercase tracking-[1px]">o regístrate con</span>
            <div className="flex-1 h-px bg-study-border"></div>
          </div>

          <button className="w-full bg-study-card border border-study-border rounded-xl py-3 flex items-center justify-center gap-2.5 text-sm hover:bg-study-surface hover:border-study-accent/30 transition-all">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px]">G</div>
            Google
          </button>
        </div>
      </div>

      {/* PANEL DERECHO: Visuales y Features */}
      <div className="hidden lg:flex w-[48%] relative flex-col justify-center p-12 lg:p-16 bg-study-surface overflow-hidden">
        {/* Grilla Animada */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#4fffb0 1px, transparent 1px), linear-gradient(90deg, #4fffb0 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Orbes */}
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full blur-[80px] bg-study-accent/10"></div>
        <div className="absolute top-16 -right-10 w-[250px] h-[250px] rounded-full blur-[80px] bg-blue-500/10"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-study-accent/25 rounded-full text-[10px] font-medium tracking-[1.5px] uppercase text-study-accent mb-7">
            ¿Por qué StudyAI?
          </div>
          <h2 className="font-syne text-[38px] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4">
            Tu ventaja<br />de <span className="text-study-accent">estudio.</span>
          </h2>
          <p className="text-sm text-study-muted leading-relaxed max-w-[340px] mb-10">
            Diseñado para estudiantes que quieren resultados reales con menos estrés y más inteligencia.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { icon: '🧠', title: 'Resúmenes con IA', desc: 'Sube cualquier material y recibe un resumen inteligente en segundos.' },
              { icon: '❓', title: 'Quizzes adaptativos', desc: 'Preguntas generadas automáticamente según tu nivel y progreso.' },
              { icon: '✅', title: 'Verdadero o Falso', desc: 'Refuerza conceptos clave con ejercicios rápidos y dinámicos.' },
              { icon: '📅', title: 'Plan inteligente', desc: 'Organiza tus sesiones con un plan personalizado según tus metas.' }
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-4 p-4.5 bg-white/5 border border-study-border rounded-xl hover:border-study-accent/20 hover:bg-study-accent/5 hover:translate-x-1 transition-all">
                <div className="w-9 h-9 bg-study-accent/10 border border-study-accent/10 rounded-lg flex items-center justify-center text-lg shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <div className="font-syne text-sm font-bold mb-0.5 tracking-[-0.3px]">{feat.title}</div>
                  <div className="text-xs text-study-muted leading-relaxed">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
