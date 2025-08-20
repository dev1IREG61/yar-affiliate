"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ClickDatum = {
  name: string;
  clicks: number;
};

interface ClicksBarChartProps {
  data: ClickDatum[];
}

export default function ClicksBarChart({ data }: ClicksBarChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
