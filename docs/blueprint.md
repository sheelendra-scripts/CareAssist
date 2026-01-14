# **App Name**: CareAssist

## Core Features:

- Data Ingestion: Accept simulated vitals via REST or MQTT and store time-series data locally. Vitals include heart_rate, spo2, temperature and movement.
- NEWS2 Scoring: Implement deterministic NEWS2 scoring based on heart_rate, spo2, temperature and respiration rate (optional) and generate a total score and per-parameter breakdown.
- AI Anomaly Detection: Detect deviations from patient baseline using statistical baselines or lightweight LSTM autoencoder and output an anomaly_score (0–1).
- Hybrid Risk Engine: Compute a composite risk score using NEWS2 score, anomaly_score, chronic disease weight, and time-since-last-review (aging). Return composite_score and risk_level (LOW / MEDIUM / HIGH).
- Dynamic Priority Queue: Implement a priority queue that sorts patients by composite risk, uses aging to prevent starvation, and updates in real-time.
- Alert System: Trigger alerts when NEWS2 ≥ 5 OR anomaly_score > 0.85. Alert includes patient_id, risk_level, timestamp and AI-generated explanation.
- Explanation Engine (Gemini API): Use the Gemini API as a tool to generate natural-language explanations of patient risk. Input: vitals trend summary, NEWS2 breakdown, anomaly_score, and chronic conditions.
- Dashboard (Triage Board): Display a sorted patient list by risk with traffic-light colors, smooth reordering animations, mini sparklines, and AI-generated risk summaries.
- Patient Detail View: Display vitals timeline (last 1 hour), NEWS2 breakdown, anomaly indicator, Gemini explanation, and alert history.

## Style Guidelines:

- Primary color: Deep blue (#243c5a) to evoke a sense of calm, confidence, and intelligence.
- Background color: Very light grey (#f0f2f5), nearly white, to minimize clutter and reduce eye strain.
- Accent color: Soft, muted teal (#6b9080) to highlight important information and actions without overwhelming the interface. It is analogous to blue, while offering an alternative.
- Headline font: 'Space Grotesk', a sans-serif font that evokes technology with a computerized, scientific feel.
- Body font: 'Inter', a grotesque-style sans-serif font that is clean and objective.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use Lucide Icons for a consistent, minimalist style. Icons should be simple, clear, and easily recognizable.
- Maintain a clean and uncluttered layout with high contrast for easy readability. Information should be presented in a clear and logical manner.
- Use Framer Motion for smooth, meaningful transitions, particularly for priority changes and state transitions. Avoid decorative animations.