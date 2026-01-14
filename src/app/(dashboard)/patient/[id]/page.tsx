import { notFound } from 'next/navigation';
import { patients } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { VitalsChart } from '@/components/patient/vitals-chart';
import { RiskExplanation } from '@/components/patient/risk-explanation';
import { News2Card } from '@/components/patient/news2-card';
import { AnomalyCard } from '@/components/patient/anomaly-card';
import { AlertHistory } from '@/components/patient/alert-history';
import { format, formatDistanceToNow } from 'date-fns';

export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) {
    notFound();
  }

  const patientInitials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Patient Details" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage
              src={patient.avatarUrl}
              alt={patient.name}
              data-ai-hint="person portrait"
            />
            <AvatarFallback className="text-2xl">{patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-headline text-3xl font-bold">{patient.name}</h2>
            <p className="text-muted-foreground">
              {patient.age}y {patient.gender} &bull; Room {patient.room}
            </p>
          </div>
        </div>

        <div className="space-y-2">
            <h3 className="font-headline text-lg font-semibold">Chronic Conditions</h3>
            <div className="flex flex-wrap gap-2">
                {patient.chronicConditions.map(condition => (
                    <Badge key={condition} variant="secondary">{condition}</Badge>
                ))}
            </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
            Last reviewed by {patient.lastReviewed.userName} about {formatDistanceToNow(patient.lastReviewed.timestamp)} ago.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <VitalsChart vitals={patient.vitals} />
                <RiskExplanation summary={patient.riskSummary} />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <News2Card news2={patient.news2} />
                <AnomalyCard score={patient.anomalyScore} />
                <AlertHistory alerts={patient.alerts} />
            </div>
        </div>
      </main>
    </div>
  );
}
