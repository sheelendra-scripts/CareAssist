'use client';

import type { Vital } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { HeartPulse, Thermometer, Droplets } from 'lucide-react';

type VitalsChartProps = {
  vitals: Vital[];
};

export function VitalsChart({ vitals }: VitalsChartProps) {
  const chartData = vitals.map((v) => ({
    time: format(v.timestamp, 'HH:mm'),
    'Heart Rate': v.heart_rate,
    SpO2: v.spo2,
    Temperature: v.temperature,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vitals Timeline</CardTitle>
        <CardDescription>Last 1 Hour</CardDescription>
      </CardHeader>
      <CardContent className="h-96 w-full pr-6">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
            />
            <Legend
              iconSize={16}
              wrapperStyle={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Heart Rate"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              name="Heart Rate (bpm)"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="SpO2"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              name="SpO2 (%)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Temperature"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              name="Temp (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
