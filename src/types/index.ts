import type { DetectBreedOutput } from '@/ai/flows/detect-breed';
import type { EstimateAgeOutput } from '@/ai/flows/estimate-age';
import type { AnalyzeBehaviorOutput } from '@/ai/flows/behavior-analysis';

export type AnalysisResult =
  | { type: 'breed'; data: DetectBreedOutput; age: EstimateAgeOutput }
  | { type: 'behavior'; data: AnalyzeBehaviorOutput };

export interface AnalysisRecord {
  id: string;
  timestamp: Date;
  input: {
    fileName: string;
    fileType: 'image' | 'video';
  };
  result: AnalysisResult;
}
