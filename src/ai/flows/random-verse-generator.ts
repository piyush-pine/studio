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
  verse: z.string().describe('A random verse from the Vedas in its original language (Sanskrit).'),
  translation: z.string().describe('The English translation of the verse.'),
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
  prompt: `You are a Vedic scholar. Your task is to provide a random verse from one of the four Vedas: Rigveda, Yajurveda, Samaveda, or Atharvaveda.

  Randomly select one of the four Vedas and provide a significant verse from it, in its original Sanskrit.
  Also provide the English translation for the verse.
  Finally, provide its source (e.g., Rigveda, Mandala 1, Hymn 1, Verse 1).
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
