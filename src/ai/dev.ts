import { config } from 'dotenv';
config();

import '@/ai/flows/detect-anomalous-vitals.ts';
import '@/ai/flows/explain-patient-risk.ts';
import '@/ai/flows/alert-on-high-risk.ts';