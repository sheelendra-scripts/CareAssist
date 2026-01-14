import type { Patient } from '@/lib/types';
import { PatientCard } from './patient-card';

type PatientListProps = {
  patients: Patient[];
};

export function PatientList({ patients }: PatientListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
