import type { Patient } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

type News2CardProps = {
  news2: Patient['news2'];
};

const parameters: (keyof Patient['news2']['breakdown'])[] = [
    'respiration_rate', 'spo2', 'air_or_oxygen', 'heart_rate', 'temperature', 'consciousness', 'systolic_bp'
]

export function News2Card({ news2 }: News2CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NEWS2 Score</CardTitle>
        <CardDescription>National Early Warning Score</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border bg-secondary/50 p-6">
          <p className="text-6xl font-bold text-primary">{news2.total_score}</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-muted-foreground">Breakdown</h4>
          <ul className="space-y-1 text-sm">
            {parameters.map(param => (
                <li key={param} className="flex justify-between">
                    <span className="capitalize text-foreground/80">{param.replace(/_/g, ' ')}</span>
                    <span className="font-mono font-medium text-foreground">{news2.breakdown[param]}</span>
                </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
