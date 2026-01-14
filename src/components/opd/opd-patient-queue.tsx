'use client';

import type { OpdPatient } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OpdPatientQueueCard } from './opd-patient-queue-card';

type OpdPatientQueueProps = {
  patients: OpdPatient[];
  selectedPatientId: string | null;
  onPatientSelect: (patientId: string) => void;
  onReorder: (patientId: string, direction: 'up' | 'down') => void;
  onSetPriority: (patientId: string) => void;
  onResetPriority: (patientId: string) => void;
};

export function OpdPatientQueue({
  patients,
  selectedPatientId,
  onPatientSelect,
  onReorder,
  onSetPriority,
  onResetPriority,
}: OpdPatientQueueProps) {
  return (
    <div className="flex h-full flex-col border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Today's Queue ({patients.length})</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4 pt-0">
          {patients.map((patient, index) => (
            <OpdPatientQueueCard
              key={patient.opd_patient_id}
              patient={patient}
              isSelected={patient.opd_patient_id === selectedPatientId}
              onSelect={() => onPatientSelect(patient.opd_patient_id)}
              onReorder={onReorder}
              onSetPriority={onSetPriority}
              onResetPriority={onResetPriority}
              isFirst={index === 0}
              isLast={index === patients.length - 1}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
