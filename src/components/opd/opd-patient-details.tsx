import type { OpdPatient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { News2Card } from '@/components/patient/news2-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Stethoscope, User, HeartPulse, Droplets, Thermometer, Gauge, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';


type OpdPatientDetailsProps = {
  patient: OpdPatient | undefined;
  onNotesChange: (patientId: string, notes: string) => void;
};

const riskBadgeClass: Record<OpdPatient['system_risk_level'], string> = {
  HIGH: 'risk-badge-high',
  MEDIUM: 'risk-badge-medium',
  LOW: 'risk-badge-low',
};


export function OpdPatientDetails({ patient, onNotesChange }: OpdPatientDetailsProps) {
  if (!patient) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-muted/50 text-center">
        <Stethoscope className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">No Patient Selected</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a patient from the queue to view their details.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full bg-muted/20">
      <div className="p-6 space-y-6">
        {/* Patient Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-3xl">{patient.name}</CardTitle>
                <CardDescription className="text-base">
                  {patient.age}y {patient.gender}
                </CardDescription>
              </div>
              <Badge className={cn('text-base', riskBadgeClass[patient.system_risk_level])}>
                {patient.system_risk_level} Risk
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
             <h3 className="text-sm font-medium text-muted-foreground mb-2">Previous Conditions</h3>
             <div className="flex flex-wrap gap-2">
                {patient.previous_conditions.length > 0 ? (
                    patient.previous_conditions.map(condition => (
                        <Badge key={condition} variant="secondary">{condition}</Badge>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground">None reported.</p>
                )}
            </div>
          </CardContent>
        </Card>

        {/* Vitals & NEWS2 */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
                <CardTitle className="text-xl">Vitals on Entry</CardTitle>
                <CardDescription>One-time measurement upon arrival</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Heart Rate</p>
                        <p className="font-bold text-lg">{patient.vitals_on_entry.heart_rate} bpm</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">SpO2</p>
                        <p className="font-bold text-lg">{patient.vitals_on_entry.spo2}%</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Thermometer className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="font-bold text-lg">{patient.vitals_on_entry.temperature}°C</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Gauge className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Systolic BP</p>
                        <p className="font-bold text-lg">{patient.vitals_on_entry.systolic_bp} mmHg</p>
                    </div>
                </div>
            </CardContent>
          </Card>
          
          {/* We can reuse the inpatient NEWS2 card here */}
          <News2Card news2={patient.news2} />
        </div>

        {/* Notes */}
        <Card>
            <CardHeader>
                 <CardTitle className="text-xl flex items-center gap-2"><StickyNote className="h-5 w-5"/> Doctor's Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Textarea 
                    placeholder="Enter notes for this patient..." 
                    className="min-h-[120px]"
                    value={patient.notes}
                    onChange={(e) => onNotesChange(patient.opd_patient_id, e.target.value)}
                />
                <div className="flex justify-end">
                    <Button size="sm">Save Notes</Button>
                </div>
            </CardContent>
        </Card>

      </div>
    </ScrollArea>
  );
}
