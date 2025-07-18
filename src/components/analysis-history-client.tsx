"use client";

import { useAnalysis } from "@/contexts/analysis-context";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, Clapperboard, FileQuestion } from "lucide-react";
import { format } from "date-fns";

export function AnalysisHistoryClient() {
  const { history } = useAnalysis();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No History Found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Perform an analysis on the dashboard to see your results here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((record) => (
        <Card key={record.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {record.result.type === "breed" ? (
                  <>
                    <PawPrint className="h-5 w-5" /> Breed & Age Analysis
                  </>
                ) : (
                  <>
                    <Clapperboard className="h-5 w-5" /> Behavior Analysis
                  </>
                )}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {format(record.timestamp, "PPP p")}
              </span>
            </div>
            <CardDescription>Input file: {record.input.fileName}</CardDescription>
          </CardHeader>
          <CardContent>
            {record.result.type === 'breed' && (
              <div className="space-y-2">
                <div>
                  <h4 className="font-semibold">Top Breed Prediction:</h4>
                  <p>{record.result.data.predictions[0]?.breed || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Estimated Age:</h4>
                  <p>{record.result.age.ageRange}</p>
                </div>
              </div>
            )}
            {record.result.type === 'behavior' && (
                 <div>
                    <h4 className="font-semibold">Behavior Classification:</h4>
                    <p>{record.result.data.behaviorAnalysis.likelyClassifications}</p>
                 </div>
            )}
          </CardContent>
          <CardFooter>
            <Badge variant="outline">{record.input.fileType}</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
