import { useState, useMemo } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());

  const { month, year, calendarDays } = useMemo(() => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    
    // Primer día del mes
    const firstDayOfMonth = new Date(y, m, 1);
    // Día de la semana del primer día (0=Dom, 1=Lun...) -> Convertir a 0=Lun, 6=Dom
    let startDay = firstDayOfMonth.getDay() - 1;
    if (startDay === -1) startDay = 6; // Domingo es 6

    // Días en el mes actual
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    
    // Días del mes anterior para completar la primera semana
    const daysInPrevMonth = new Date(y, m, 0).getDate();
    const prevMonthDays = Array.from({ length: startDay }, (_, i) => ({
      day: daysInPrevMonth - startDay + i + 1,
      currentMonth: false,
      date: new Date(y, m - 1, daysInPrevMonth - startDay + i + 1)
    }));

    // Días del mes actual
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      currentMonth: true,
      date: new Date(y, m, i + 1)
    }));

    // Días del mes siguiente para completar la cuadrícula (total 42 celdas: 6 semanas)
    const totalCells = 42;
    const nextMonthDaysCount = totalCells - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => ({
      day: i + 1,
      currentMonth: false,
      date: new Date(y, m + 1, i + 1)
    }));

    return {
      year: y,
      month: m,
      calendarDays: [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    };
  }, [viewDate]);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <>
      <Sidebar />
      <main
        className="min-h-screen bg-study-bg transition-[margin] duration-300 ease-in-out flex flex-col"
        style={{ marginLeft: 'var(--sidebar-width)' }}
      >
        {/* Header / Toolbar */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-study-border/50">
          <div className="flex items-center gap-6">
            <h1 className="text-[24px] font-bold tracking-tight text-study-text">
              {MONTHS[month]} <span className="font-light text-study-muted">{year}</span>
            </h1>
            <div className="flex items-center gap-1">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1.5 rounded-md hover:bg-study-surface text-study-muted hover:text-study-text transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setViewDate(new Date())}
                className="px-3 py-1 text-[12px] font-medium rounded-md border border-study-border hover:bg-study-surface transition-colors cursor-pointer text-study-text"
              >
                Hoy
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="p-1.5 rounded-md hover:bg-study-surface text-study-muted hover:text-study-text transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Grid Container */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 lg:p-8">
          <div className="flex-1 bg-study-bg border border-study-border rounded-xl overflow-hidden flex flex-col shadow-sm">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-study-border bg-study-surface/30">
              {DAYS_OF_WEEK.map((d) => (
                <div key={d} className="py-3 text-center text-[11px] font-bold uppercase tracking-widest text-study-muted border-r border-study-border last:border-r-0">
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-6">
              {calendarDays.map((item, idx) => (
                <div
                  key={idx}
                  className={`
                    relative p-3 border-r border-b border-study-border last:border-r-0 group
                    ${!item.currentMonth ? 'bg-study-surface/20 text-study-muted/40' : 'text-study-text'}
                    hover:bg-study-accent/[0.02] transition-colors cursor-default
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`
                      text-[13px] font-medium w-7 h-7 flex items-center justify-center rounded-full transition-colors
                      ${isToday(item.date) ? 'bg-study-accent text-study-bg font-bold' : 'group-hover:bg-study-surface'}
                    `}>
                      {item.day}
                    </span>
                  </div>
                  
                  {/* Espacio para eventos futuros */}
                  <div className="space-y-1">
                    {/* Placeholder de evento */}
                    {isToday(item.date) && (
                      <div className="text-[10px] px-1.5 py-0.5 rounded bg-study-accent/10 text-study-accent font-semibold truncate border border-study-accent/20">
                        Hoy
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Below Calendar */}
          <section className="mt-8 pt-8 border-t border-study-border/30">
             {/* Placeholder for future features */}
             <div className="flex flex-col items-center justify-center py-12 opacity-30 grayscale pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-study-surface flex items-center justify-center mb-4">
                   🗓️
                </div>
                <p className="text-sm font-medium text-study-muted">Próximas funcionalidades: lista de exámenes, metas de estudio y recordatorios.</p>
             </div>
          </section>
        </div>
      </main>
    </>
  );
}
