import { useState } from "react";
import { Download, Save, ScanLine, Calendar, FileText, Activity } from "lucide-react";
import { caseResult } from "@/lib/mock-data";

export function ResultsView() {
  const [report, setReport] = useState(caseResult.report);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Image comparison */}
      <div className="xl:col-span-3 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Comparação Visual</h3>
            <span className="text-xs px-3 py-1 rounded-full bg-success/10 text-success font-medium">
              Análise validada
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImagePanel title="Imagem Original / Input" />
            <ImagePanel title="Predição da IA / Segmentação" highlight />
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
            <ScanLine className="h-3.5 w-3.5" />
            Sobreposição colorida indica regiões detectadas pelo modelo com confiança ≥ 90%
          </p>
        </div>
      </div>

      {/* Clinical panel */}
      <div className="xl:col-span-2 space-y-6">
        {/* Metadata */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Informações do Caso</h3>
          <dl className="space-y-3 text-sm">
            <MetaRow icon={FileText} label="ID do Exame" value={caseResult.examId} />
            <MetaRow icon={Calendar} label="Processado em" value={caseResult.processedAt} />
            <MetaRow icon={Activity} label="Modalidade" value={caseResult.modality} />
            <div className="flex justify-between items-center pt-1">
              <span className="text-muted-foreground">Status</span>
              <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                {caseResult.status}
              </span>
            </div>
          </dl>
        </div>

        {/* Metrics */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Métricas do Modelo</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Nível de Confiança da IA</span>
                <span className="font-semibold tabular-nums">{caseResult.confidence}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${caseResult.confidence}%` }} />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-accent/40 border border-accent">
              <p className="text-xs text-muted-foreground mb-1">Achado principal</p>
              <p className="text-sm font-medium">{caseResult.finding}</p>
              <p className="text-xs text-secondary mt-2 font-medium">{caseResult.classification}</p>
            </div>
          </div>
        </div>

        {/* Report */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <label className="text-base font-semibold block mb-3">Observações Médicas / Laudo Preliminar</label>
          <textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            rows={7}
            className="w-full p-4 rounded-xl border border-border bg-background text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted transition-colors">
              <Download className="h-4 w-4" />
              Exportar Relatório (PDF)
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm">
              <Save className="h-4 w-4" />
              Salvar no Banco de Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }: { icon: typeof FileText; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}

function ImagePanel({ title, highlight }: { title: string; highlight?: boolean }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 border border-border">
        {/* Simulated CT scan */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-3/4 w-3/4 rounded-full bg-gradient-radial from-slate-400 via-slate-600 to-slate-900 opacity-90">
            <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-slate-500/60 to-slate-800/80" />
            <div className="absolute top-[30%] left-[40%] h-3 w-3 rounded-full bg-slate-300/70" />
            <div className="absolute top-[55%] left-[25%] h-2 w-2 rounded-full bg-slate-300/50" />
            {highlight && (
              <>
                <div className="absolute top-[28%] left-[55%] h-10 w-10 rounded-full bg-destructive/40 border-2 border-destructive animate-pulse" />
                <div className="absolute top-[28%] left-[55%] h-10 w-10 rounded-full ring-2 ring-destructive/60 ring-offset-2 ring-offset-transparent" />
              </>
            )}
          </div>
        </div>
        {highlight && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <span className="px-2 py-1 rounded-md bg-destructive/90 text-destructive-foreground font-medium">
              Região detectada
            </span>
            <span className="px-2 py-1 rounded-md bg-black/60 text-white font-medium tabular-nums">96.4%</span>
          </div>
        )}
      </div>
    </div>
  );
}
