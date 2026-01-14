'use client';

import type { Patient } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AlertTriangle, HeartPulse, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type PatientCardProps = {
  patient: Patient;
};

const riskColors = {
  HIGH: 'bg-red-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-green-500',
};

export function PatientCard({ patient }: PatientCardProps) {
  const patientInitials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const chartData = patient.vitals.map((v) => ({
    time: v.timestamp,
    hr: v.heart_rate,
  }));

  return (
    <Link href={`/patient/${patient.id}`} className="block h-full">
      <Card className="flex h-full flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex-row items-start gap-4 space-y-0">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={patient.avatarUrl}
              alt={patient.name}
              data-ai-hint="person portrait"
            />
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="font-headline text-lg">{patient.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {patient.age}y {patient.gender} &bull; Room {patient.room}
            </p>
          </div>
          <div
            className={cn(
              'h-3 w-3 rounded-full',
              riskColors[patient.compositeRisk.level]
            )}
            title={`Risk Level: ${patient.compositeRisk.level}`}
          ></div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border p-2">
              <p className="text-xs font-semibold text-muted-foreground">
                NEWS2
              </p>
              <p className="font-bold text-lg text-primary">
                {patient.news2.total_score}
              </p>
            </div>
            <div className="rounded-lg border p-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Anomaly
              </p>
              <p className="font-bold text-lg text-primary">
                {patient.anomalyScore.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                  formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                  labelFormatter={() => ''}
                />
                <Line
                  type="monotone"
                  dataKey="hr"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground italic">
            &ldquo;{patient.riskSummary}&rdquo;
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
