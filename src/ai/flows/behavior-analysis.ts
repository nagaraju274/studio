// src/ai/flows/behavior-analysis.ts
'use server';
/**
 * @fileOverview A behavior analysis AI agent.
 *
 * - analyzeBehavior - A function that handles the behavior analysis process.
 * - AnalyzeBehaviorInput - The input type for the analyzeBehavior function.
 * - AnalyzeBehaviorOutput - The return type for the analyzeBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBehaviorInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The description of the pet and its behavior.'),
});
export type AnalyzeBehaviorInput = z.infer<typeof AnalyzeBehaviorInputSchema>;

const AnalyzeBehaviorOutputSchema = z.object({
  behaviorAnalysis: z.object({
    likelyClassifications: z.string().describe('The likely classifications of the pet\'s behavior.'),
    confidenceLevel: z.number().describe('The confidence level of the behavior analysis.'),
  }),
});
export type AnalyzeBehaviorOutput = z.infer<typeof AnalyzeBehaviorOutputSchema>;

export async function analyzeBehavior(input: AnalyzeBehaviorInput): Promise<AnalyzeBehaviorOutput> {
  return analyzeBehaviorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBehaviorPrompt',
  input: {schema: AnalyzeBehaviorInputSchema},
  output: {schema: AnalyzeBehaviorOutputSchema},
  prompt: `You are an expert animal behaviorist.

You will use this information to analyze the pet's behavior and determine the likely classifications from the provided video.  You will also provide a confidence level for your analysis.

Description: {{{description}}}
Video: {{media url=videoDataUri}}`,
});

const analyzeBehaviorFlow = ai.defineFlow(
  {
    name: 'analyzeBehaviorFlow',
    inputSchema: AnalyzeBehaviorInputSchema,
    outputSchema: AnalyzeBehaviorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
