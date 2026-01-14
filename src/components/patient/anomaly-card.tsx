import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type AnomalyCardProps = {
  score: number;
};

export function AnomalyCard({ score }: AnomalyCardProps) {
  const percentage = Math.round(score * 100);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Score</CardTitle>
        <CardDescription>AI-detected deviation from baseline</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border bg-secondary/50 p-6">
          <p className="text-6xl font-bold text-primary">{score.toFixed(2)}</p>
        </div>
        <Progress value={percentage} aria-label={`${percentage}% anomaly score`} />
      </CardContent>
    </Card>
  );
}
