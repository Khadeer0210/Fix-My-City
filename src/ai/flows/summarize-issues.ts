
'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing a list of issues
 * for an official report.
 *
 * - summarizeIssuesForOfficial - A function that takes a list of issue titles and returns a concise summary.
 * - SummarizeIssuesInput - The input type for the flow.
 * - SummarizeIssuesOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SummarizeIssuesInputSchema = z.object({
  issues: z.array(z.string()).describe('A list of issue titles to be summarized.'),
});
export type SummarizeIssuesInput = z.infer<typeof SummarizeIssuesInputSchema>;

const SummarizeIssuesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the issues, formatted for an official communication.'),
});
export type SummarizeIssuesOutput = z.infer<typeof SummarizeIssuesOutputSchema>;

export async function summarizeIssuesForOfficial(input: SummarizeIssuesInput): Promise<SummarizeIssuesOutput> {
  return summarizeIssuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIssuesPrompt',
  input: { schema: SummarizeIssuesInputSchema },
  output: { schema: SummarizeIssuesOutputSchema },
  prompt: `You are an AI assistant for a city administrator. Your task is to generate a concise, professional summary of outstanding civic issues to be forwarded to a government department for action.

Format the summary clearly. Start with a brief opening statement, then list the key issues, and end with a call to action.

Here are the issue titles to summarize:
{{#each issues}}
- {{{this}}}
{{/each}}
`,
});

const summarizeIssuesFlow = ai.defineFlow(
  {
    name: 'summarizeIssuesFlow',
    inputSchema: SummarizeIssuesInputSchema,
    outputSchema: SummarizeIssuesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
