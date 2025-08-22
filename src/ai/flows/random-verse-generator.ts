'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a random verse from the Vedas.
 *
 * - `getRandomVedaVerse` - A function that retrieves a random verse from the Vedas.
 * - `RandomVedaVerseInput` - The input type for the getRandomVedaVerse function (currently empty).
 * - `RandomVedaVerseOutput` - The return type for the getRandomVedaVerse function, containing the verse and its source.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RandomVedaVerseInputSchema = z.object({});
export type RandomVedaVerseInput = z.infer<typeof RandomVedaVerseInputSchema>;

const RandomVedaVerseOutputSchema = z.object({
  verse: z.string().describe('A random verse from the Vedas.'),
  source: z.string().describe('The Veda and section from which the verse originates.'),
});
export type RandomVedaVerseOutput = z.infer<typeof RandomVedaVerseOutputSchema>;

export async function getRandomVedaVerse(input: RandomVedaVerseInput): Promise<RandomVedaVerseOutput> {
  return randomVedaVerseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'randomVedaVersePrompt',
  input: {schema: RandomVedaVerseInputSchema},
  output: {schema: RandomVedaVerseOutputSchema},
  prompt: `You are a Vedic scholar. Your task is to provide a random verse from the Vedas, along with its source (Veda name and section).

  Respond with a verse and its source.
  `,
});

const randomVedaVerseFlow = ai.defineFlow(
  {
    name: 'randomVedaVerseFlow',
    inputSchema: RandomVedaVerseInputSchema,
    outputSchema: RandomVedaVerseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
