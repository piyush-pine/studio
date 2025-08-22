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
  verse: z
    .string()
    .describe('A random verse from the Vedas in its original language (Sanskrit).'),
  translation: z.string().describe('The English translation of the verse.'),
  source: z
    .string()
    .describe('The Veda and section from which the verse originates.'),
  context: z
    .string()
    .describe('The cultural, historical, and narrative context behind the verse, including any related stories.'),
});
export type RandomVedaVerseOutput = z.infer<typeof RandomVedaVerseOutputSchema>;

export async function getRandomVedaVerse(
  input: RandomVedaVerseInput
): Promise<RandomVedaVerseOutput> {
  return randomVedaVerseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'randomVedaVersePrompt',
  input: {schema: RandomVedaVerseInputSchema},
  output: {schema: RandomVedaVerseOutputSchema},
  prompt: `You are a Vedic scholar and historian. Your task is to provide a random verse from one of the four Vedas: Rigveda, Yajurveda, Samaveda, or Atharvaveda.

Ensure that each time you are called, you provide a *different* verse than the last time. Do not repeat verses.

1.  Randomly select one of the four Vedas and provide a significant verse from it in its original Sanskrit.
2.  Provide the English translation for the verse.
3.  Provide its source (e.g., Rigveda, Mandala 1, Hymn 1, Verse 1).
4.  Most importantly, provide the historical and cultural context for the verse. Explain the circumstances, the deities involved, the rituals it relates to, or any stories and narratives associated with it to give a complete picture of its significance.
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
