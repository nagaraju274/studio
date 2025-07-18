import { AnalysisHistoryClient } from "@/components/analysis-history-client";

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline tracking-tight">Analysis History</h1>
      <p className="text-muted-foreground">
        Review your past pet analyses from this session.
      </p>
      <div className="mt-6">
        <AnalysisHistoryClient />
      </div>
    </div>
  );
}
