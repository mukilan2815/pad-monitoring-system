
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { SensorReading } from "@/contexts/SensorDataContext";

interface MetricChartProps {
  title: string;
  description?: string;
  data: SensorReading[];
  dataKey: string;
  color: string;
  valueFormatter?: (value: number) => string;
  unit?: string;
}

const CustomTooltip = ({ active, payload, label, valueFormatter, unit }: TooltipProps<number, string> & { valueFormatter?: (value: number) => string, unit?: string }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;
    const formattedValue = valueFormatter ? valueFormatter(value) : value;

    return (
      <div className="glassmorphism p-3 rounded-lg shadow-sm">
        <p className="text-xs text-muted-foreground">
          {format(new Date(label), "MMM d, h:mm:ss a")}
        </p>
        <p className="font-medium">
          {formattedValue}{unit && ` ${unit}`}
        </p>
      </div>
    );
  }

  return null;
};

export function MetricChart({
  title,
  description,
  data,
  dataKey,
  color,
  valueFormatter,
  unit
}: MetricChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  // Transform data for the chart
  useEffect(() => {
    if (data && data.length > 0) {
      // Process the data for chart display
      const processedData = data.map((reading) => {
        let value;
        
        // Handle nested properties like motion.x
        if (dataKey.includes('.')) {
          const [parent, child] = dataKey.split('.');
          value = reading[parent as keyof SensorReading]?.[child as keyof typeof reading[keyof typeof reading]];
        } else {
          value = reading[dataKey as keyof SensorReading];
        }
        
        return {
          timestamp: reading.timestamp,
          [dataKey]: value
        };
      });
      
      setChartData(processedData);
    }
  }, [data, dataKey]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[240px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(tick) => format(new Date(tick), "HH:mm")} 
                tick={{ fontSize: 12 }}
                stroke="#888888"
                tickLine={false}
              />
              <YAxis 
                tickFormatter={valueFormatter} 
                tick={{ fontSize: 12 }}
                stroke="#888888"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                content={<CustomTooltip valueFormatter={valueFormatter} unit={unit} />} 
                cursor={{ stroke: '#f3f4f6', strokeWidth: 1 }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                fillOpacity={1}
                fill={`url(#gradient-${dataKey})`}
                strokeWidth={2}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
