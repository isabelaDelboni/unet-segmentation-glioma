import { useState, useRef, DragEvent } from "react";
import { UploadCloud, FileImage, Loader2, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFile { name: string; size: string; }

export function UploadView({ onProcessed }: { onProcessed?: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024 / 1024).toFixed(2)} MB`,
    }));
    setFiles((prev) => [...prev, ...arr]);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const startProcessing = () => {
    if (!files.length) return;
    setStatus("uploading");
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setStatus("done");
          return 100;
        }
        return p + 5;
      });
    }, 120);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "rounded-2xl border-2 border-dashed bg-card p-12 text-center cursor-pointer transition-all",
          dragging ? "border-primary bg-accent/40 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        <div className="mx-auto h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
          <UploadCloud className="h-8 w-8 text-accent-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Arraste e solte seus arquivos aqui</h3>
        <p className="text-sm text-muted-foreground mt-2">ou clique para selecionar do seu computador</p>
        <p className="text-xs text-muted-foreground mt-4">
          Formatos aceitos: <span className="font-medium text-foreground">DICOM, PNG, JPG</span> · Tamanho máximo: 50MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h4 className="text-sm font-semibold mb-4">Arquivos selecionados ({files.length})</h4>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <div className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center">
                  <FileImage className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.size}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, idx) => idx !== i)); }}
                  className="h-8 w-8 rounded-lg hover:bg-card flex items-center justify-center text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          {status !== "idle" && (
            <div className="mt-5 p-4 rounded-xl bg-accent/40">
              <div className="flex items-center gap-3 mb-3">
                {status === "uploading" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
                <p className="text-sm font-medium">
                  {status === "uploading" ? "Processando arquivo..." : "Processamento concluído!"}
                </p>
                <span className="ml-auto text-xs font-semibold tabular-nums">{progress}%</span>
              </div>
              <div className="h-2 bg-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => { setFiles([]); setStatus("idle"); setProgress(0); }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted transition-colors"
            >
              Limpar
            </button>
            {status === "done" ? (
              <button
                onClick={onProcessed}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                Ver Resultado
              </button>
            ) : (
              <button
                onClick={startProcessing}
                disabled={status === "uploading"}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60"
              >
                Processar e Analisar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
