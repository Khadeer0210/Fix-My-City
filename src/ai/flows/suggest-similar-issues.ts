'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting similar issues based on a new issue report.
 *
 * The flow takes an issue description and location as input and returns a list of similar issue descriptions.
 * - suggestSimilarIssues - A function that handles the suggestion of similar issues.
 * - SuggestSimilarIssuesInput - The input type for the suggestSimilarIssues function.
 * - SuggestSimilarIssuesOutput - The return type for the suggestSimilarIssues function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarIssuesInputSchema = z.object({
  description: z.string().describe('The description of the issue being reported.'),
  location: z.string().describe('The location of the issue being reported.'),
});
export type SuggestSimilarIssuesInput = z.infer<typeof SuggestSimilarIssuesInputSchema>;

const SuggestSimilarIssuesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of similar issue descriptions.'),
});
export type SuggestSimilarIssuesOutput = z.infer<typeof SuggestSimilarIssuesOutputSchema>;

export async function suggestSimilarIssues(input: SuggestSimilarIssuesInput): Promise<SuggestSimilarIssuesOutput> {
  return suggestSimilarIssuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSimilarIssuesPrompt',
  input: {schema: SuggestSimilarIssuesInputSchema},
  output: {schema: SuggestSimilarIssuesOutputSchema},
  prompt: `You are an AI assistant helping users report issues in their city.

  Given the following issue description and location, suggest a list of similar existing issues that might already have been reported. Return a list of issue descriptions only. Return an empty array if no suggestions apply.

  Issue Description: {{{description}}}
  Location: {{{location}}}
  `,
});

const suggestSimilarIssuesFlow = ai.defineFlow(
  {
    name: 'suggestSimilarIssuesFlow',
    inputSchema: SuggestSimilarIssuesInputSchema,
    outputSchema: SuggestSimilarIssuesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
