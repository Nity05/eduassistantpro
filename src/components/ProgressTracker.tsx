
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { month: 'Week 1', progress: 20 },
  { month: 'Week 2', progress: 35 },
  { month: 'Week 3', progress: 45 },
  { month: 'Week 4', progress: 60 },
  { month: 'Week 5', progress: 75 },
  { month: 'Week 6', progress: 90 },
];

const chartConfig = {
  progress: {
    label: "Career Progress",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
};

const ProgressTracker = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-[300px]">
      <h3 className="text-lg font-semibold mb-3 text-center">Career Progress Tracker</h3>
      <div className="h-[230px] w-full">
        <ChartContainer config={chartConfig} className="h-full">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Line
              type="monotone"
              dataKey="progress"
              name="progress"
              stroke="var(--color-progress, #3b82f6)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ProgressTracker;
