"use client";

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalysis } from '@/contexts/analysis-context';
import type { AnalysisRecord, AnalysisResult } from '@/types';
import { detectBreed, type DetectBreedOutput } from '@/ai/flows/detect-breed';
import { estimateAge, type EstimateAgeOutput } from '@/ai/flows/estimate-age';
import { analyzeBehavior, type AnalyzeBehaviorOutput } from '@/ai/flows/behavior-analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/file-uploader';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import PetBotChat from '@/components/petbot-chat';
import { PawPrint, Clapperboard, BrainCircuit, Droplets } from 'lucide-react';

export function DashboardClient() {
  const { toast } = useToast();
  const { addAnalysis } = useAnalysis();

  const [breedAndAgeResult, setBreedAndAgeResult] = useState<{ breed: DetectBreedOutput; age: EstimateAgeOutput; photo: string } | null>(null);
  const [behaviorResult, setBehaviorResult] = useState<{ behavior: AnalyzeBehaviorOutput; video: string } | null>(null);
  
  const [isBreedLoading, setIsBreedLoading] = useState(false);
  const [isBehaviorLoading, setIsBehaviorLoading] = useState(false);

  const handleImageUpload = async (file: { dataUri: string; name: string }) => {
    setIsBreedLoading(true);
    setBreedAndAgeResult(null);

    try {
      const [breedRes, ageRes] = await Promise.all([
        detectBreed({ photoDataUri: file.dataUri }),
        estimateAge({ photoDataUri: file.dataUri }),
      ]);
      
      const result = { breed: breedRes, age: ageRes, photo: file.dataUri };
      setBreedAndAgeResult(result);
      
      const analysisRecord: AnalysisRecord = {
        id: new Date().toISOString(),
        timestamp: new Date(),
        input: { fileName: file.name, fileType: 'image' },
        result: { type: 'breed', data: result.breed, age: result.age },
      };
      addAnalysis(analysisRecord);

      toast({ title: "Analysis Complete", description: "Breed and age estimation finished." });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "Analysis Failed", description: "Could not analyze the image." });
    } finally {
      setIsBreedLoading(false);
    }
  };

  const handleVideoUpload = async (file: { dataUri: string; name: string }) => {
    setIsBehaviorLoading(true);
    setBehaviorResult(null);

    try {
      const behaviorRes = await analyzeBehavior({
        videoDataUri: file.dataUri,
        description: 'Analyze the behavior of the pet in this video.',
      });

      const result = { behavior: behaviorRes, video: file.dataUri };
      setBehaviorResult(result);

      const analysisRecord: AnalysisRecord = {
        id: new Date().toISOString(),
        timestamp: new Date(),
        input: { fileName: file.name, fileType: 'video' },
        result: { type: 'behavior', data: result.behavior },
      };
      addAnalysis(analysisRecord);

      toast({ title: "Analysis Complete", description: "Behavior analysis finished." });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "Analysis Failed", description: "Could not analyze the video." });
    } finally {
      setIsBehaviorLoading(false);
    }
  };

  return (
    <Tabs defaultValue="breed" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
        <TabsTrigger value="breed">
          <PawPrint className="mr-2 h-4 w-4" /> Breed & Age
        </TabsTrigger>
        <TabsTrigger value="behavior">
          <Clapperboard className="mr-2 h-4 w-4" /> Behavior
        </TabsTrigger>
        <TabsTrigger value="petbot">
          <BrainCircuit className="mr-2 h-4 w-4" /> PetBot Chat
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="breed" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Breed & Age Detection</CardTitle>
            <CardDescription>Upload a photo of your pet to identify its breed and estimate its age.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader onFileUpload={handleImageUpload} accept={{ 'image/png': [], 'image/jpeg': [] }} />
            {isBreedLoading && <Progress value={50} className="w-full mt-4 animate-pulse" />}
            {breedAndAgeResult && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="relative aspect-square w-full max-w-sm mx-auto">
                    <Image src={breedAndAgeResult.photo} alt="Uploaded pet" fill className="rounded-lg object-cover" />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Top Breed Predictions</CardTitle>
                      <PawPrint className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {breedAndAgeResult.breed.predictions.map((p, i) => (
                          <p key={i} className="text-sm font-medium leading-none">{p.breed}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Estimated Age</CardTitle>
                      <Droplets className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                       <div className="text-2xl font-bold">{breedAndAgeResult.age.ageRange}</div>
                       <p className="text-xs text-muted-foreground">Confidence: {Math.round(breedAndAgeResult.age.confidence * 100)}%</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="behavior" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Behavior Analysis</CardTitle>
            <CardDescription>Upload a short video (max 20MB) to analyze your pet's behavior.</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader onFileUpload={handleVideoUpload} accept={{ 'video/mp4': [] }} />
             {isBehaviorLoading && <Progress value={50} className="w-full mt-4 animate-pulse" />}
            {behaviorResult && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="relative aspect-video w-full max-w-sm mx-auto">
                   <video src={behaviorResult.video} controls className="rounded-lg w-full h-full" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                      <h3 className="font-semibold">Likely Behavior Classifications:</h3>
                      <p>{behaviorResult.behavior.behaviorAnalysis.likelyClassifications}</p>
                      <div className="flex items-center pt-2">
                        <span className="text-sm text-muted-foreground mr-2">Confidence:</span>
                        <Progress value={behaviorResult.behavior.behaviorAnalysis.confidenceLevel * 100} className="w-1/2" />
                      </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="petbot" className="mt-4">
        <PetBotChat 
          breedAndAgeResult={breedAndAgeResult}
          behaviorResult={behaviorResult?.behavior}
        />
      </TabsContent>
    </Tabs>
  );
}
