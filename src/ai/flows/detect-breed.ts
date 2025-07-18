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
  predictions: z.array(
    z.object({
      breed: z.string().describe('The predicted breed of the pet.'),
      confidence: z
        .number()
        .describe('The confidence level of the prediction (0-1).'),
    })
  ).
describe('A list of breed predictions with confidence levels.'),
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

  Analyze the provided photo and identify the pet's breed. Provide a list of up to 5 breed predictions, along with their confidence levels (0-1).

  Photo: {{media url=photoDataUri}}
  {
    "predictions": [
      {
        "breed": "",
        "confidence": 0
      }
    ]
  }`,
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
