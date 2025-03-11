
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PadRiskGaugeProps {
  value: number;
  className?: string;
}

export function PadRiskGauge({ value, className }: PadRiskGaugeProps) {
  // Define risk level thresholds
  const isLow = value < 25;
  const isMedium = value >= 25 && value < 50;
  const isHigh = value >= 50 && value < 75;
  const isCritical = value >= 75;

  // Define colors based on risk level
  const progressColor = cn({
    "bg-gradient-to-r from-green-400 to-green-500": isLow,
    "bg-gradient-to-r from-yellow-400 to-orange-400": isMedium,
    "bg-gradient-to-r from-orange-400 to-red-400": isHigh,
    "bg-gradient-to-r from-red-400 to-red-600": isCritical,
  });

  // Define risk level text
  const riskLevel = isLow 
    ? "Low Risk" 
    : isMedium 
      ? "Moderate Risk" 
      : isHigh 
        ? "High Risk" 
        : "Critical Risk";

  // Define risk level description
  const riskDescription = isLow 
    ? "Normal blood flow patterns. Continue regular monitoring." 
    : isMedium 
      ? "Some blood flow irregularities detected. Consider preventative measures." 
      : isHigh 
        ? "Significant blood flow reduction detected. Consult a healthcare provider." 
        : "Severe vascular issues detected. Immediate medical attention recommended.";

  const riskTextColor = cn({
    "text-green-600": isLow,
    "text-yellow-600": isMedium,
    "text-orange-600": isHigh,
    "text-red-600": isCritical,
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">PAD Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Low Risk</span>
            <span className="text-sm text-muted-foreground">Critical Risk</span>
          </div>
          
          <div className="relative">
            <Progress 
              value={value} 
              className="h-3 rounded-full" 
              indicatorClassName={progressColor}
            />
            <div 
              className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full transform -translate-y-1/2"
              style={{ left: `${value}%`, top: '50%' }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className={cn("font-medium text-lg", riskTextColor)}>
                {riskLevel}
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                {riskDescription}
              </p>
            </div>
            <div className={cn("text-4xl font-bold", riskTextColor)}>
              {value}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
