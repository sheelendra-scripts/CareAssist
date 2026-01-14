'use server';
/**
 * @fileOverview This file defines a Genkit flow to trigger alerts based on NEWS2 score and anomaly score.
 *
 * - alertOnHighRisk - A function that triggers an alert based on NEWS2 score and anomaly score.
 * - AlertOnHighRiskInput - The input type for the alertOnHighRisk function.
 * - AlertOnHighRiskOutput - The return type for the alertOnHighRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertOnHighRiskInputSchema = z.object({
  patient_id: z.string().describe('The ID of the patient.'),
  risk_level: z.string().describe('The risk level of the patient (LOW, MEDIUM, HIGH).'),
  timestamp: z.number().describe('The timestamp of the alert.'),
  news2_score: z.number().describe('The NEWS2 score of the patient.'),
  anomaly_score: z.number().describe('The anomaly score of the patient (0-1).'),
  vitals_trend_summary: z.string().describe('A summary of the patient vitals trend.'),
  news2_breakdown: z.string().describe('A breakdown of the NEWS2 score.'),
  chronic_conditions: z.string().describe('The chronic conditions of the patient.'),
});
export type AlertOnHighRiskInput = z.infer<typeof AlertOnHighRiskInputSchema>;

const AlertOnHighRiskOutputSchema = z.object({
  explanation: z.string().describe('A natural language explanation of the patient risk.'),
});
export type AlertOnHighRiskOutput = z.infer<typeof AlertOnHighRiskOutputSchema>;

export async function alertOnHighRisk(input: AlertOnHighRiskInput): Promise<AlertOnHighRiskOutput> {
  return alertOnHighRiskFlow(input);
}

const explanationPrompt = ai.definePrompt({
  name: 'explanationPrompt',
  input: {schema: AlertOnHighRiskInputSchema},
  output: {schema: AlertOnHighRiskOutputSchema},
  prompt: `Patient ID: {{{patient_id}}}
Risk Level: {{{risk_level}}}
Timestamp: {{{timestamp}}}
NEWS2 Score: {{{news2_score}}}
Anomaly Score: {{{anomaly_score}}}
Vitals Trend Summary: {{{vitals_trend_summary}}}
NEWS2 Breakdown: {{{news2_breakdown}}}
Chronic Conditions: {{{chronic_conditions}}}

Generate a natural-language explanation of the patient risk. No prescriptions, no treatment commands, no probabilities, explanation only. Focus on explaining why the patient might be at risk and what factors are contributing to that risk.
`,
});

const alertOnHighRiskFlow = ai.defineFlow(
  {
    name: 'alertOnHighRiskFlow',
    inputSchema: AlertOnHighRiskInputSchema,
    outputSchema: AlertOnHighRiskOutputSchema,
  },
  async input => {
    const {output} = await explanationPrompt(input);
    return output!;
  }
);
