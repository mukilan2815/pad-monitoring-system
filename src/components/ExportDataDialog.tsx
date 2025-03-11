
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowDownToLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SensorReading } from "@/contexts/SensorDataContext";

interface ExportDataDialogProps {
  readings: SensorReading[];
}

export function ExportDataDialog({ readings }: ExportDataDialogProps) {
  const [includeBloodFlow, setIncludeBloodFlow] = useState(true);
  const [includeTemperature, setIncludeTemperature] = useState(true);
  const [includePressure, setIncludePressure] = useState(true);
  const [includeMotion, setIncludeMotion] = useState(false);
  const [includeRiskScore, setIncludeRiskScore] = useState(true);
  const { toast } = useToast();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleExport = (format: "csv" | "json") => {
    if (readings.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no readings available to export.",
        variant: "destructive",
      });
      return;
    }

    const filteredReadings = readings.map((reading) => {
      const filtered: Record<string, any> = {
        timestamp: formatDate(reading.timestamp),
      };

      if (includeBloodFlow) filtered.bloodFlow = reading.bloodFlow;
      if (includeTemperature) filtered.temperature = reading.temperature;
      if (includePressure) filtered.pressure = reading.pressure;
      if (includeMotion) filtered.motion = reading.motion;
      if (includeRiskScore) filtered.padRiskScore = reading.padRiskScore;

      return filtered;
    });

    let content: string;
    let mimeType: string;
    let fileExtension: string;

    if (format === "csv") {
      // Create CSV
      const headers = Object.keys(filteredReadings[0]).join(",");
      const rows = filteredReadings.map((reading) =>
        Object.values(reading).join(",")
      );
      content = [headers, ...rows].join("\n");
      mimeType = "text/csv";
      fileExtension = "csv";
    } else {
      // Create JSON
      content = JSON.stringify(filteredReadings, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    }

    // Create download link
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pad_data_export_${new Date().toISOString().split("T")[0]}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported Successfully",
      description: `Your data has been exported as a ${format.toUpperCase()} file.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ArrowDownToLine className="w-4 h-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Your Health Data</DialogTitle>
          <DialogDescription>
            Select which data you want to include in your export
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bloodFlow"
                checked={includeBloodFlow}
                onCheckedChange={(checked) => setIncludeBloodFlow(!!checked)}
              />
              <Label htmlFor="bloodFlow">Blood Flow Data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="temperature"
                checked={includeTemperature}
                onCheckedChange={(checked) => setIncludeTemperature(!!checked)}
              />
              <Label htmlFor="temperature">Temperature Data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pressure"
                checked={includePressure}
                onCheckedChange={(checked) => setIncludePressure(!!checked)}
              />
              <Label htmlFor="pressure">Pressure Data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="motion"
                checked={includeMotion}
                onCheckedChange={(checked) => setIncludeMotion(!!checked)}
              />
              <Label htmlFor="motion">Motion Data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="riskScore"
                checked={includeRiskScore}
                onCheckedChange={(checked) => setIncludeRiskScore(!!checked)}
              />
              <Label htmlFor="riskScore">PAD Risk Score</Label>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleExport("json")}
            className="sm:w-1/2"
          >
            Export as JSON
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => handleExport("csv")}
            className="sm:w-1/2"
          >
            Export as CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
