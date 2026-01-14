export type Vital = {
  timestamp: number;
  heart_rate: number;
  spo2: number;
  temperature: number;
  respiration_rate: number;
  movement: number;
};

export type News2Breakdown = {
  respiration_rate: number;
  spo2: number;
  air_or_oxygen: number;
  systolic_bp: number;
  heart_rate: number;
  consciousness: number;
  temperature: number;
};

export type Alert = {
  id: string;
  timestamp: number;
  explanation: string;
};

export type Patient = {
  id: string;
  name: string;
  avatarUrl: string;
  age: number;
  gender: 'Male' | 'Female';
  room: string;
  chronicConditions: string[];
  vitals: Vital[];
  news2: {
    total_score: number;
    breakdown: News2Breakdown;
  };
  anomalyScore: number;
  compositeRisk: {
    score: number;
    level: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  lastReviewed: {
    userName: string;
    timestamp: number;
  };
  riskSummary: string;
  alerts: Alert[];
};

export type OpdVitals = {
  heart_rate: number;
  spo2: number;
  temperature: number;
  systolic_bp: number;
  respiration_rate: number;
};

export type OpdPatient = {
  opd_patient_id: string;
  name: string;
  avatarUrl: string;
  age: number;
  gender: 'Male' | 'Female';
  visit_time: number;
  vitals_on_entry: OpdVitals;
  previous_conditions: string[];
  system_risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  queue_position: number;
  manual_override: boolean;
  notes?: string;
  news2: {
    total_score: number;
    breakdown: News2Breakdown;
  };
};
