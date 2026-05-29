import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, type TabKey } from "@/components/AppShell";
import { DashboardView } from "@/components/DashboardView";
import { UploadView } from "@/components/UploadView";
import { ResultsView } from "@/components/ResultsView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedAI — Sistema de Análise Médica por IA" },
      { name: "description", content: "Dashboard clínico para análise de exames médicos com Inteligência Artificial." },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<TabKey>("dashboard");
  return (
    <AppShell active={tab} onChange={setTab}>
      {tab === "dashboard" && <DashboardView />}
      {tab === "upload" && <UploadView onProcessed={() => setTab("results")} />}
      {tab === "results" && <ResultsView />}
    </AppShell>
  );
}
