import { Activity, Clock, Target, Upload, TrendingUp, TrendingDown, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { stats, chartData, activities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = { Activity, Clock, Target, Upload };

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-secondary to-primary text-primary-foreground p-6 md:p-8 shadow-sm">
        <p className="text-xs uppercase tracking-wider opacity-80">Bem-vindo de volta</p>
        <h2 className="text-2xl md:text-3xl font-semibold mt-1">Dr. Rafael, aqui está o resumo de hoje</h2>
        <p className="text-sm opacity-90 mt-2 max-w-2xl">
          O sistema MedAI processou 127 novos exames nas últimas 24 horas com 96.4% de precisão.
          3 casos requerem revisão prioritária.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          const Trend = s.positive ? TrendingUp : TrendingDown;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  s.positive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
                )}>
                  <Trend className="h-3 w-3" />
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-semibold mt-4">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold">Volume de Análises</h3>
              <p className="text-sm text-muted-foreground">Evolução mensal — últimos 8 meses</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary"/>Análises</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-secondary"/>Precisão</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }}/>
                <Area type="monotone" dataKey="analises" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold">Atividades Recentes</h3>
            <button className="text-xs text-primary font-medium hover:underline">Ver tudo</button>
          </div>
          <ul className="space-y-4">
            {activities.map((a) => {
              const Icon = a.type === "success" ? CheckCircle2 : a.type === "warning" ? AlertTriangle : Info;
              const color = a.type === "success" ? "text-success bg-success/10" : a.type === "warning" ? "text-warning bg-warning/10" : "text-primary bg-primary/10";
              return (
                <li key={a.id} className="flex gap-3">
                  <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
