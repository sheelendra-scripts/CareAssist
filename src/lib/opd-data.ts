import type { OpdPatient } from './types';

// Set base time to 10:00 AM IST (04:30 UTC)
const now = new Date('2024-07-30T04:30:00Z').getTime();
const fiveMinutes = 5 * 60 * 1000;

export const opdPatients: OpdPatient[] = [
  {
    opd_patient_id: 'opd001',
    name: 'Manoj Verma',
    avatarUrl: 'https://picsum.photos/seed/opd1/100/100',
    age: 45,
    gender: 'Male',
    visit_time: now - 8 * fiveMinutes,
    vitals_on_entry: { heart_rate: 82, spo2: 98, temperature: 37.1, systolic_bp: 125, respiration_rate: 18 },
    previous_conditions: ['Migraine'],
    system_risk_level: 'LOW',
    queue_position: 1,
    manual_override: false,
    news2: { total_score: 0, breakdown: { respiration_rate: 0, spo2: 0, air_or_oxygen: 0, systolic_bp: 0, heart_rate: 0, consciousness: 0, temperature: 0 } },
    notes: 'Patient reporting mild headache.'
  },
  {
    opd_patient_id: 'opd002',
    name: 'Priya Reddy',
    avatarUrl: 'https://picsum.photos/seed/opd2/100/100',
    age: 28,
    gender: 'Female',
    visit_time: now - 7 * fiveMinutes,
    vitals_on_entry: { heart_rate: 95, spo2: 97, temperature: 38.5, systolic_bp: 110, respiration_rate: 22 },
    previous_conditions: [],
    system_risk_level: 'HIGH',
    queue_position: 2,
    manual_override: false,
    news2: { total_score: 5, breakdown: { respiration_rate: 2, spo2: 0, air_or_oxygen: 0, systolic_bp: 0, heart_rate: 1, consciousness: 0, temperature: 2 } },
    notes: 'Complaining of fever and cough for 2 days.'
  },
  {
    opd_patient_id: 'opd003',
    name: 'Dinesh Iyer',
    avatarUrl: 'https://picsum.photos/seed/opd3/100/100',
    age: 68,
    gender: 'Male',
    visit_time: now - 5 * fiveMinutes,
    vitals_on_entry: { heart_rate: 105, spo2: 94, temperature: 37.0, systolic_bp: 145, respiration_rate: 20 },
    previous_conditions: ['Hypertension', 'Asthma'],
    system_risk_level: 'MEDIUM',
    queue_position: 3,
    manual_override: false,
    news2: { total_score: 3, breakdown: { respiration_rate: 1, spo2: 1, air_or_oxygen: 0, systolic_bp: 0, heart_rate: 1, consciousness: 0, temperature: 0 } },
    notes: 'Follow-up for blood pressure management. Feels a bit winded today.'
  },
  {
    opd_patient_id: 'opd004',
    name: 'Sneha Rao',
    avatarUrl: 'https://picsum.photos/seed/opd4/100/100',
    age: 52,
    gender: 'Female',
    visit_time: now - 2 * fiveMinutes,
    vitals_on_entry: { heart_rate: 75, spo2: 99, temperature: 36.9, systolic_bp: 118, respiration_rate: 16 },
    previous_conditions: ['Diabetes Type 2'],
    system_risk_level: 'LOW',
    queue_position: 4,
    manual_override: false,
    news2: { total_score: 0, breakdown: { respiration_rate: 0, spo2: 0, air_or_oxygen: 0, systolic_bp: 0, heart_rate: 0, consciousness: 0, temperature: 0 } },
    notes: 'Routine check-up.'
  },
   {
    opd_patient_id: 'opd005',
    name: 'Vikram Malhotra',
    avatarUrl: 'https://picsum.photos/seed/opd5/100/100',
    age: 34,
    gender: 'Male',
    visit_time: now - 1 * fiveMinutes,
    vitals_on_entry: { heart_rate: 68, spo2: 98, temperature: 37.2, systolic_bp: 120, respiration_rate: 15 },
    previous_conditions: [],
    system_risk_level: 'LOW',
    queue_position: 5,
    manual_override: false,
    news2: { total_score: 0, breakdown: { respiration_rate: 0, spo2: 0, air_or_oxygen: 0, systolic_bp: 0, heart_rate: 0, consciousness: 0, temperature: 0 } },
    notes: 'Wants to discuss a minor skin rash.'
  },
];
