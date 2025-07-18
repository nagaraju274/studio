// estimate-age.ts
'use server';

/**
 * @fileOverview Estimates the age of a pet from an uploaded image.
 *
 * - estimateAge - A function that handles the age estimation process.
 * - EstimateAgeInput - The input type for the estimateAge function.
 * - EstimateAgeOutput - The return type for the estimateAge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateAgeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EstimateAgeInput = z.infer<typeof EstimateAgeInputSchema>;

const EstimateAgeOutputSchema = z.object({
  ageRange: z.string().describe('The estimated age range of the pet.'),
  confidence: z.number().describe('The confidence level of the age estimation (0-1).'),
});
export type EstimateAgeOutput = z.infer<typeof EstimateAgeOutputSchema>;

export async function estimateAge(input: EstimateAgeInput): Promise<EstimateAgeOutput> {
  return estimateAgeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateAgePrompt',
  input: {schema: EstimateAgeInputSchema},
  output: {schema: EstimateAgeOutputSchema},
  prompt: `You are an expert in estimating the age of pets from images. Analyze the provided image and provide an estimated age range.

  Photo: {{media url=photoDataUri}}
  
  Return the age range and a confidence level (0-1).`,
});

const estimateAgeFlow = ai.defineFlow(
  {
    name: 'estimateAgeFlow',
    inputSchema: EstimateAgeInputSchema,
    outputSchema: EstimateAgeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
