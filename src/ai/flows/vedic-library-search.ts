// This file uses server-side code.
'use server';

/**
 * @fileOverview Implements a flow to search the Vedic Library using keywords or phrases.
 *
 * - vedicLibrarySearch - A function that handles the Vedic Library search process.
 * - VedicLibrarySearchInput - The input type for the vedicLibrarySearch function.
 * - VedicLibrarySearchOutput - The return type for the vedicLibrarySearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VedicLibrarySearchInputSchema = z.object({
  query: z.string().describe('The search query to use when searching the Vedic Library.'),
});
export type VedicLibrarySearchInput = z.infer<typeof VedicLibrarySearchInputSchema>;

const VedicLibrarySearchOutputSchema = z.object({
  results: z.array(z.string()).describe('The search results from the Vedic Library.'),
});
export type VedicLibrarySearchOutput = z.infer<typeof VedicLibrarySearchOutputSchema>;

const vedicLibrarySearchTool = ai.defineTool({
  name: 'vedicLibrarySearch',
  description: 'Searches the Vedic Library for verses or passages that match the query.',
  inputSchema: z.object({
    query: z.string().describe('The search query to use when searching the Vedic Library.'),
  }),
  outputSchema: z.array(z.string()).describe('The search results from the Vedic Library.'),
}, async (input) => {
  // Mock implementation for demonstration purposes.
  // In a real application, this would call an actual search API.
  const {
    query
  } = input;
  const mockResults = [
    `Mock Result 1: A verse related to "${query}".`,
    `Mock Result 2: Another passage mentioning "${query}".`,
  ];
  return mockResults;
});

const vedicLibrarySearchPrompt = ai.definePrompt({
  name: 'vedicLibrarySearchPrompt',
  tools: [vedicLibrarySearchTool],
  input: {schema: VedicLibrarySearchInputSchema},
  output: {schema: VedicLibrarySearchOutputSchema},
  prompt: `You are a Vedic scholar, use the vedicLibrarySearch tool to find relevant verses or passages from the Vedic Library that match the user's query: "{{query}}". Return the results in a structured JSON format.`,  
});

const vedicLibrarySearchFlow = ai.defineFlow(
  {
    name: 'vedicLibrarySearchFlow',
    inputSchema: VedicLibrarySearchInputSchema,
    outputSchema: VedicLibrarySearchOutputSchema,
  },
  async input => {
    const {output} = await vedicLibrarySearchPrompt(input);
    return output!;
  }
);

export async function vedicLibrarySearch(input: VedicLibrarySearchInput): Promise<VedicLibrarySearchOutput> {
  return vedicLibrarySearchFlow(input);
}
