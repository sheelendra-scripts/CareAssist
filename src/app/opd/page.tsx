'use client';

import { useState } from 'react';
import { opdPatients as initialPatients } from '@/lib/opd-data';
import type { OpdPatient } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { OpdPatientQueue } from '@/components/opd/opd-patient-queue';
import { OpdPatientDetails } from '@/components/opd/opd-patient-details';
import { produce } from 'immer';

export default function OpdPage() {
  const [patients, setPatients] = useState<OpdPatient[]>(() =>
    initialPatients.sort((a, b) => a.queue_position - b.queue_position)
  );
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    patients[0]?.opd_patient_id || null
  );

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };
  
  const handleReorder = (patientId: string, direction: 'up' | 'down') => {
    setPatients(currentPatients => {
      const newPatients = produce(currentPatients, draft => {
        const patientIndex = draft.findIndex(p => p.opd_patient_id === patientId);
        if (patientIndex === -1) return;
  
        const targetIndex = direction === 'up' ? patientIndex - 1 : patientIndex + 1;
        if (targetIndex < 0 || targetIndex >= draft.length) return;
  
        // Swap
        [draft[patientIndex], draft[targetIndex]] = [draft[targetIndex], draft[patientIndex]];
  
        // Update queue positions and set manual override
        draft.forEach((p, index) => {
          p.queue_position = index + 1;
          if (p.opd_patient_id === patientId || p.opd_patient_id === draft[patientIndex].opd_patient_id) {
             p.manual_override = true;
          }
        });
      });
      return newPatients.sort((a, b) => a.queue_position - b.queue_position);
    });
  };

  const handleSetPriority = (patientId: string) => {
    setPatients(currentPatients => {
        const newPatients = produce(currentPatients, draft => {
            const patientToMove = draft.find(p => p.opd_patient_id === patientId);
            if (!patientToMove) return;

            patientToMove.manual_override = true;
            
            // Remove patient from current position
            const remainingPatients = draft.filter(p => p.opd_patient_id !== patientId);

            // Insert at the top
            const finalQueue = [patientToMove, ...remainingPatients];

            // Re-assign queue positions
            finalQueue.forEach((p, index) => {
                p.queue_position = index + 1;
            });

            return finalQueue;
        });
        return newPatients.sort((a, b) => a.queue_position - b.queue_position);
    });
  };

  const handleResetPriority = (patientId: string) => {
     setPatients(currentPatients => {
        const newPatients = produce(currentPatients, draft => {
            const patientToReset = draft.find(p => p.opd_patient_id === patientId);
            if (!patientToReset) return;

            patientToReset.manual_override = false;
            
            // Re-sort based on original arrival time for non-overridden patients
            draft.sort((a, b) => {
                if (a.manual_override && !b.manual_override) return -1;
                if (!a.manual_override && b.manual_override) return 1;
                if (a.manual_override && b.manual_override) return a.queue_position - b.queue_position;
                return a.visit_time - b.visit_time;
            });

            // Re-assign queue positions
            draft.forEach((p, index) => {
                p.queue_position = index + 1;
            });
        });
        return newPatients.sort((a, b) => a.queue_position - b.queue_position);
     });
  };


  const handleNotesChange = (patientId: string, notes: string) => {
    setPatients(currentPatients =>
      produce(currentPatients, draft => {
        const patient = draft.find(p => p.opd_patient_id === patientId);
        if (patient) {
          patient.notes = notes;
        }
      })
    );
  };

  const selectedPatient = patients.find(
    (p) => p.opd_patient_id === selectedPatientId
  );

  return (
    <div className="flex h-screen w-full flex-col">
      <Header title="OPD Queue" />
      <div className="flex-1 overflow-hidden">
        <div className="grid h-full md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr]">
          <OpdPatientQueue
            patients={patients}
            selectedPatientId={selectedPatientId}
            onPatientSelect={handlePatientSelect}
            onReorder={handleReorder}
            onSetPriority={handleSetPriority}
            onResetPriority={handleResetPriority}
          />
          <OpdPatientDetails
            patient={selectedPatient}
            onNotesChange={handleNotesChange}
          />
        </div>
      </div>
    </div>
  );
}
