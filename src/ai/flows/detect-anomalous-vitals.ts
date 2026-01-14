'use server';
/**
 * @fileOverview Detects anomalies in patient vital signs using AI.
 *
 * - detectAnomalousVitals - A function that detects anomalies in vital signs.
 * - DetectAnomalousVitalsInput - The input type for the detectAnomalousVitals function.
 * - DetectAnomalousVitalsOutput - The return type for the detectAnomalousVitals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomalousVitalsInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient.'),
  heartRate: z.number().describe('The patient\'s heart rate.'),
  spo2: z.number().describe('The patient\'s oxygen saturation level (SpO2).'),
  temperature: z.number().describe('The patient\'s body temperature in Celsius.'),
  movement: z.number().describe('The patient\'s movement level (e.g., activity score).'),
  timestamp: z.string().describe('The timestamp of the vital signs reading (ISO format).'),
});
export type DetectAnomalousVitalsInput = z.infer<typeof DetectAnomalousVitalsInputSchema>;

const DetectAnomalousVitalsOutputSchema = z.object({
  anomalyScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the degree of anomaly detected in the vital signs. Higher values indicate a greater deviation from the patient\'s baseline.'
    ),
  explanation: z
    .string()
    .optional()
    .describe('A natural language explanation of the anomaly, if any.'),
});
export type DetectAnomalousVitalsOutput = z.infer<typeof DetectAnomalousVitalsOutputSchema>;

export async function detectAnomalousVitals(
  input: DetectAnomalousVitalsInput
): Promise<DetectAnomalousVitalsOutput> {
  return detectAnomalousVitalsFlow(input);
}

const detectAnomalousVitalsPrompt = ai.definePrompt({
  name: 'detectAnomalousVitalsPrompt',
  input: {schema: DetectAnomalousVitalsInputSchema},
  output: {schema: DetectAnomalousVitalsOutputSchema},
  prompt: `You are an AI assistant specializing in detecting anomalies in patient vital signs.

  Analyze the following vital signs data for patient {{patientId}}:

  - Heart Rate: {{heartRate}} bpm
  - SpO2: {{spo2}}%
  - Temperature: {{temperature}} °C
  - Movement: {{movement}}
  - Timestamp: {{timestamp}}

  Determine an anomaly score (0-1) indicating the degree of unusualness of these vital signs compared to typical values, and provide a brief explanation if the anomaly score is above 0.8.

  Consider potential interdependencies and correlations between the vital signs. For instance, a high heart rate combined with low SpO2 could be more concerning than either in isolation.

  Output the anomaly score and explanation formatted as a JSON object.
  The anomalyScore should represent the probability that the patient needs immediate attention.
  Always respond in JSON format.
  {
    "anomalyScore": number,
    "explanation": string
  }`,
});

const detectAnomalousVitalsFlow = ai.defineFlow(
  {
    name: 'detectAnomalousVitalsFlow',
    inputSchema: DetectAnomalousVitalsInputSchema,
    outputSchema: DetectAnomalousVitalsOutputSchema,
  },
  async input => {
    const {output} = await detectAnomalousVitalsPrompt(input);
    return output!;
  }
);
