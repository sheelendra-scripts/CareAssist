import type { Alert } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { AlertTriangle, Bell } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

type AlertHistoryProps = {
  alerts: Alert[];
};

export function AlertHistory({ alerts }: AlertHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert History</CardTitle>
        <CardDescription>Recent critical alerts</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center text-muted-foreground py-6">
            <Bell className="h-8 w-8" />
            <p>No alerts in the last 24 hours.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert.id} className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-destructive">
                    High Risk Alert
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(alert.timestamp, 'MMM d, yyyy, HH:mm')} ({formatDistanceToNow(alert.timestamp)} ago)
                  </p>
                  <p className="mt-1 text-sm text-foreground/80">
                    {alert.explanation}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
