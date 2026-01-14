import { Header } from '@/components/layout/header';
import { patients } from '@/lib/data';
import { PatientList } from '@/components/dashboard/patient-list';

export default function DashboardPage() {
  const sortedPatients = [...patients].sort(
    (a, b) => b.compositeRisk.score - a.compositeRisk.score
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col">
      <Header title="Inpatient Triage Board" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <PatientList patients={sortedPatients} />
      </main>
    </div>
  );
}
