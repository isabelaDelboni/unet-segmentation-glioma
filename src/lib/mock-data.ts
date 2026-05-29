export const stats = [
  { label: "Total de Análises", value: "2.847", change: "+12.5%", positive: true, icon: "Activity" },
  { label: "Casos Pendentes", value: "34", change: "-8.2%", positive: true, icon: "Clock" },
  { label: "Precisão da IA", value: "96.4%", change: "+0.8%", positive: true, icon: "Target" },
  { label: "Uploads Hoje", value: "127", change: "+24.1%", positive: true, icon: "Upload" },
];

export const chartData = [
  { month: "Jan", analises: 180, precisao: 92 },
  { month: "Fev", analises: 220, precisao: 93 },
  { month: "Mar", analises: 280, precisao: 94 },
  { month: "Abr", analises: 310, precisao: 94 },
  { month: "Mai", analises: 360, precisao: 95 },
  { month: "Jun", analises: 420, precisao: 95 },
  { month: "Jul", analises: 480, precisao: 96 },
  { month: "Ago", analises: 547, precisao: 96 },
];

export const activities = [
  { id: 1, title: "Análise do Caso #842 concluída", time: "há 2 horas", type: "success" },
  { id: 2, title: "Novo upload recebido — Paciente #1294", time: "há 3 horas", type: "info" },
  { id: 3, title: "Revisão médica solicitada — Caso #839", time: "há 4 horas", type: "warning" },
  { id: 4, title: "Modelo de IA atualizado para v2.4.1", time: "há 6 horas", type: "info" },
  { id: 5, title: "Relatório exportado — Caso #835", time: "há 8 horas", type: "success" },
  { id: 6, title: "Análise do Caso #831 concluída", time: "ontem", type: "success" },
  { id: 7, title: "Backup automático finalizado", time: "ontem", type: "info" },
];

export const caseResult = {
  examId: "EXM-2024-00847",
  processedAt: "20/05/2026 14:32",
  status: "Análise Concluída",
  patient: "Paciente #1284",
  modality: "Tomografia Computadorizada",
  confidence: 96.4,
  finding: "Nódulo pulmonar suspeito — lobo superior direito",
  classification: "Categoria Lung-RADS 4A",
  report:
    "Identificada lesão nodular sólida medindo aproximadamente 12mm de diâmetro no segmento apical do lobo superior direito, com margens espiculadas e densidade heterogênea. O modelo de IA destacou características morfológicas compatíveis com lesão de provável natureza neoplásica. Recomenda-se correlação clínica e investigação complementar com PET-CT para estadiamento adequado. Demais estruturas torácicas sem alterações significativas.",
};
