
import type { OpdPatient } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useHasMounted } from '@/hooks/use-has-mounted';
import {
  ArrowUp,
  ArrowDown,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Thermometer,
  HeartPulse,
  Droplets,
  Gauge,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type OpdPatientQueueCardProps = {
  patient: OpdPatient;
  isSelected: boolean;
  onSelect: () => void;
  onReorder: (patientId: string, direction: 'up' | 'down') => void;
  onSetPriority: (patientId: string) => void;
  onResetPriority: (patientId: string) => void;
  isFirst: boolean;
  isLast: boolean;
};

const riskBadgeClass: Record<OpdPatient['system_risk_level'], string> = {
  HIGH: 'risk-badge-high',
  MEDIUM: 'risk-badge-medium',
  LOW: 'risk-badge-low',
};

export function OpdPatientQueueCard({
  patient,
  isSelected,
  onSelect,
  onReorder,
  onSetPriority,
  onResetPriority,
  isFirst,
  isLast,
}: OpdPatientQueueCardProps) {
  const hasMounted = useHasMounted();
  const patientInitials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'hover:bg-muted/50'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="relative">
             <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={patient.avatarUrl}
                alt={patient.name}
                data-ai-hint="person portrait"
              />
              <AvatarFallback>{patientInitials}</AvatarFallback>
            </Avatar>
            {patient.manual_override && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                                <Sparkles className="h-2.5 w-2.5" />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Manual priority set</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{patient.name}</p>
                <p className="text-xs text-muted-foreground">
                  {patient.age}y {patient.gender} &bull; Arrived at{' '}
                  {hasMounted ? format(patient.visit_time, 'HH:mm') : '...'}
                </p>
              </div>
              <Badge className={cn('text-xs', riskBadgeClass[patient.system_risk_level])}>
                {patient.system_risk_level}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex gap-2">
                    <span className="flex items-center gap-1"><HeartPulse className="h-3 w-3" /> {patient.vitals_on_entry.heart_rate}</span>
                    <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> {patient.vitals_on_entry.spo2}%</span>
                    <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> {patient.vitals_on_entry.temperature}°C</span>
                    <span className="flex items-center gap-1"><Gauge className="h-3 w-3" /> {patient.vitals_on_entry.systolic_bp}</span>
                </div>
                <div className="flex items-center gap-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onReorder(patient.opd_patient_id, 'up')}} disabled={isFirst}>
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Move Up</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onReorder(patient.opd_patient_id, 'down')}} disabled={isLast}>
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent><p>Move Down</p></TooltipContent>
                        </Tooltip>
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSetPriority(patient.opd_patient_id)}}>
                                    <ShieldAlert className="h-4 w-4 text-yellow-600" />
                                </Button>
                            </TooltipTrigger>
                             <TooltipContent><p>Set High Priority</p></TooltipContent>
                        </Tooltip>
                        {patient.manual_override && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onResetPriority(patient.opd_patient_id)}}>
                                        <RotateCcw className="h-4 w-4 text-blue-600" />
                                    </Button>
                                </TooltipTrigger>
                                 <TooltipContent><p>Reset Priority</p></TooltipContent>
                            </Tooltip>
                        )}
                    </TooltipProvider>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
