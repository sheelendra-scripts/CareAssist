Description

CareAssist is a Semi-Autonomous Intelligent Triage System engineered to solve two critical failures in modern healthcare: "Cognitive Overload" in inpatient wards and "Blind Prioritization" in outpatient queues. Traditional systems rely on manual spot-checks and First-In-First-Out (FIFO) logic, leading to "Failure to Rescue" events where patient deterioration is missed until it is too late.


CareAssist transforms this passive model into an active, intelligent workflow:

    Smart Inpatient Monitoring (IPD): Utilizing IoT sensors (ESP32 + MAX30102), the system continuously tracks vitals and automates the NEWS2 (National Early Warning Score) calculation every 5 seconds. A hybrid AI model (LSTM Autoencoder) runs in parallel to detect subtle, non-linear anomalies that standard monitors miss, alerting staff before a crash occurs.


    Dynamic Outpatient Triage (OPD): Instead of a static line, CareAssist implements a Dynamic Priority Queue. Using a custom "Aging Algorithm," it re-ranks patients in real-time based on a weighted composite of their live vitals, historical health risks, and wait time. This ensures a patient with a silent heart attack instantly jumps the queue, while preventing "starvation" for less critical cases.


    Offline-First Architecture: Designed for resilience, the system operates on a local Fog/Edge computing architecture using MQTT and Python, ensuring full functionality even in rural clinics or disaster zones without internet connectivity.


By adhering to a "System Detects, Doctor Decides" philosophy, CareAssist reduces manual monitoring workloads by ~40% and drastically cuts response times for high-risk patients.
