// PetBot Chatbot [GenAI]: AI-powered Q&A chatbot to answer pet care questions.
// This tool determines appropriate content and messaging. Uses user input as well as the analysis above as context for a chat session with the user. Present information from previous breed and behavior analyses inline during conversation.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PetBotInputSchema = z.object({
  question: z.string().describe('The user question about their pet.'),
  breed: z.string().optional().describe('The detected breed of the pet, if available.'),
  age: z.string().optional().describe('The estimated age of the pet, if available.'),
  behavior: z.string().optional().describe('The identified behavior of the pet, if available.'),
  history: z.string().optional().describe('The history of the conversation so far.'),
});

export type PetBotInput = z.infer<typeof PetBotInputSchema>;

const PetBotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, incorporating breed, age, and behavior information when relevant.'),
});

export type PetBotOutput = z.infer<typeof PetBotOutputSchema>;

export async function petBot(input: PetBotInput): Promise<PetBotOutput> {
  return petBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'petBotPrompt',
  input: {schema: PetBotInputSchema},
  output: {schema: PetBotOutputSchema},
  prompt: `You are a helpful AI assistant for pet owners. Your name is PetGuide.

  You answer questions about pet care, and you tailor your responses to the specific pet based on available information.

  Here's some information about the pet:
  {{#if breed}}
  Breed: {{{breed}}}
  {{/if}}
  {{#if age}}
  Age: {{{age}}}
  {{/if}}
  {{#if behavior}}
  Behavior: {{{behavior}}}
  {{/if}}

  Here's the user's question:
  {{question}}

  Answer the question in a helpful and informative way.
`,
});

const petBotFlow = ai.defineFlow(
  {
    name: 'petBotFlow',
    inputSchema: PetBotInputSchema,
    outputSchema: PetBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
