
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "stable";
  status?: "normal" | "warning" | "critical";
  statusText?: string;
  className?: string;
  children?: ReactNode;
}

export function SensorCard({
  title,
  value,
  unit,
  description,
  icon,
  trend,
  status = "normal",
  statusText,
  className,
  children,
}: SensorCardProps) {
  const statusColors = {
    normal: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    warning: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    critical: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  };

  const trendIcons = {
    up: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 text-green-500"
      >
        <path
          fillRule="evenodd"
          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
          clipRule="evenodd"
        />
      </svg>
    ),
    down: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 text-red-500"
      >
        <path
          fillRule="evenodd"
          d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
    ),
    stable: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 text-blue-500"
      >
        <path
          fillRule="evenodd"
          d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4 4a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 018.25 6zm3.75-.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <Card className={cn("shadow-sm sensor-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight">
              {value}
              {unit && <span className="ml-1 text-sm font-normal">{unit}</span>}
            </div>
            {trend && <div>{trendIcons[trend]}</div>}
          </div>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
          {statusText && (
            <div className={cn("text-xs px-2 py-1 rounded-full mt-2 inline-flex items-center w-fit", statusColors[status])}>
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current inline-block"></span>
              {statusText}
            </div>
          )}
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
