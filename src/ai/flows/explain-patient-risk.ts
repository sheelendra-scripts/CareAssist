'use server';

/**
 * @fileOverview An AI agent that explains a patient's risk level using the Gemini API.
 *
 * - explainPatientRisk - A function that generates a natural language explanation of a patient's risk.
 * - ExplainPatientRiskInput - The input type for the explainPatientRisk function.
 * - ExplainPatientRiskOutput - The return type for the explainPatientRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainPatientRiskInputSchema = z.object({
  vitalsTrendSummary: z.string().describe('A summary of the patient\'s vital signs trend.'),
  news2Breakdown: z.string().describe('A breakdown of the patient\'s NEWS2 score.'),
  anomalyScore: z.number().describe('The patient\'s anomaly score (0-1).'),
  chronicConditions: z.string().describe('A list of the patient\'s chronic conditions.'),
});
export type ExplainPatientRiskInput = z.infer<typeof ExplainPatientRiskInputSchema>;

const ExplainPatientRiskOutputSchema = z.object({
  explanation: z.string().describe('A natural language explanation of the patient\'s risk level.'),
});
export type ExplainPatientRiskOutput = z.infer<typeof ExplainPatientRiskOutputSchema>;

export async function explainPatientRisk(input: ExplainPatientRiskInput): Promise<ExplainPatientRiskOutput> {
  return explainPatientRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainPatientRiskPrompt',
  input: {schema: ExplainPatientRiskInputSchema},
  output: {schema: ExplainPatientRiskOutputSchema},
  prompt: `You are an experienced healthcare assistant summarizing patient risk factors for doctors.

  Given the following information, provide a concise explanation of the factors contributing to the patient\'s risk level. Focus on the most critical aspects and potential concerns.

Vitals Trend Summary: {{{vitalsTrendSummary}}}
NEWS2 Breakdown: {{{news2Breakdown}}}
Anomaly Score: {{{anomalyScore}}}
Chronic Conditions: {{{chronicConditions}}}

Explanation: `,
});

const explainPatientRiskFlow = ai.defineFlow(
  {
    name: 'explainPatientRiskFlow',
    inputSchema: ExplainPatientRiskInputSchema,
    outputSchema: ExplainPatientRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
