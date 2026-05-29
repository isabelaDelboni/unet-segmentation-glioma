import { ReactNode } from "react";
import { LayoutDashboard, Upload, FileSearch, Stethoscope, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabKey = "dashboard" | "upload" | "results";

const navItems: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "upload", label: "Upload", icon: Upload },
  { key: "results", label: "Resultados", icon: FileSearch },
];

const titles: Record<TabKey, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard de Resultados", subtitle: "Visão geral das análises e métricas do sistema" },
  upload: { title: "Upload de Exames", subtitle: "Envie arquivos médicos para análise pela IA" },
  results: { title: "Visualização de Resultado", subtitle: "Detalhamento e laudo do caso analisado" },
};

interface Props {
  active: TabKey;
  onChange: (k: TabKey) => void;
  children: ReactNode;
}

export function AppShell({ active, onChange, children }: Props) {
  const header = titles[active];
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground leading-tight">MedAI</p>
            <p className="text-xs text-muted-foreground leading-tight">Clinical Vision</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-muted hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
            <div className="h-9 w-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">
              DR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Dr. Rafael Souza</p>
              <p className="text-xs text-muted-foreground truncate">Radiologista</p>
            </div>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-card">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{header.title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{header.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative h-10 w-10 rounded-xl border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
