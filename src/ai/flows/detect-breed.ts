// src/ai/flows/detect-breed.ts
'use server';
/**
 * @fileOverview Breed detection AI agent.
 *
 * - detectBreed - A function that handles the breed detection process.
 * - DetectBreedInput - The input type for the detectBreed function.
 * - DetectBreedOutput - The return type for the detectBreed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectBreedInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectBreedInput = z.infer<typeof DetectBreedInputSchema>;

const DetectBreedOutputSchema = z.object({
  breed: z.string().describe('The most likely breed of the pet.'),
  confidence: z
    .number()
    .describe('The confidence level of the prediction (0-1).'),
  lifeSpan: z.string().describe("The typical life span of the pet's breed."),
  commonHealthIssues: z.string().describe("Common health issues for the pet's breed."),
  behaviorWithKids: z.string().describe("The typical behavior of the breed with children."),
  behaviorWithAdults: z.string().describe("The typical behavior of the breed with adults."),
  behaviorWithElderly: z.string().describe("The typical behavior of the breed with elderly people."),
  behaviorWithFamily: z.string().describe("The typical behavior of the breed with its family members."),
  behaviorWithStrangers: z.string().describe("The typical behavior of the breed with strangers."),
});
export type DetectBreedOutput = z.infer<typeof DetectBreedOutputSchema>;

export async function detectBreed(input: DetectBreedInput): Promise<DetectBreedOutput> {
  return detectBreedFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectBreedPrompt',
  input: {schema: DetectBreedInputSchema},
  output: {schema: DetectBreedOutputSchema},
  prompt: `You are an expert in identifying pet breeds.

  Analyze the provided photo and identify the pet's most likely breed. 
  
  Provide the breed name, a confidence score (0-1), the typical life span for that breed, a summary of common health issues for that breed, and describe its typical behavioral patterns with children, adults, elderly people, its family, and with strangers.

  Photo: {{media url=photoDataUri}}`,
});

const detectBreedFlow = ai.defineFlow(
  {
    name: 'detectBreedFlow',
    inputSchema: DetectBreedInputSchema,
    outputSchema: DetectBreedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
