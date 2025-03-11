
import { useMemo } from "react";
import Layout from "@/components/Layout";
import { MetricChart } from "@/components/MetricChart";
import { PadRiskGauge } from "@/components/PadRiskGauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSensorData } from "@/contexts/SensorDataContext";
import { Separator } from "@/components/ui/separator";
import { 
  Thermometer,
  Activity,
  ArrowUp, 
  ArrowDown,
  AlertTriangle
} from "lucide-react";

const Analytics = () => {
  const { readings, latestReading, loading } = useSensorData();

  // Calculate analytics from readings
  const analytics = useMemo(() => {
    if (readings.length === 0) return null;

    // Extract individual metrics
    const bloodFlowValues = readings.map(r => r.bloodFlow);
    const temperatureValues = readings.map(r => r.temperature);
    const pressureValues = readings.map(r => r.pressure);
    const padRiskScores = readings.map(r => r.padRiskScore);

    // Calculate averages
    const avgBloodFlow = bloodFlowValues.reduce((sum, val) => sum + val, 0) / bloodFlowValues.length;
    const avgTemperature = temperatureValues.reduce((sum, val) => sum + val, 0) / temperatureValues.length;
    const avgPressure = pressureValues.reduce((sum, val) => sum + val, 0) / pressureValues.length;
    const avgPadRiskScore = padRiskScores.reduce((sum, val) => sum + val, 0) / padRiskScores.length;

    // Calculate mins and maxes
    const minBloodFlow = Math.min(...bloodFlowValues);
    const maxBloodFlow = Math.max(...bloodFlowValues);
    const minTemperature = Math.min(...temperatureValues);
    const maxTemperature = Math.max(...temperatureValues);
    const minPressure = Math.min(...pressureValues);
    const maxPressure = Math.max(...pressureValues);
    const minPadRiskScore = Math.min(...padRiskScores);
    const maxPadRiskScore = Math.max(...padRiskScores);

    // Calculate standard deviations
    const sdBloodFlow = calculateStandardDeviation(bloodFlowValues);
    const sdTemperature = calculateStandardDeviation(temperatureValues);
    const sdPressure = calculateStandardDeviation(pressureValues);
    const sdPadRiskScore = calculateStandardDeviation(padRiskScores);

    // Calculate trends (is the last value higher than the average?)
    const bloodFlowTrend = latestReading && latestReading.bloodFlow > avgBloodFlow ? "up" : "down";
    const temperatureTrend = latestReading && latestReading.temperature > avgTemperature ? "up" : "down";
    const pressureTrend = latestReading && latestReading.pressure > avgPressure ? "up" : "down";
    const padRiskScoreTrend = latestReading && latestReading.padRiskScore > avgPadRiskScore ? "up" : "down";

    // Generate insights
    const insights = [];
    
    // Blood flow insights
    if (minBloodFlow < 60) {
      insights.push({
        type: "warning",
        title: "Low Blood Flow Detected",
        description: "Blood flow dropped below 60 bpm, which may indicate restricted circulation."
      });
    }
    
    // Temperature insights
    if (maxTemperature - minTemperature > 3) {
      insights.push({
        type: "info",
        title: "Temperature Fluctuations",
        description: "Significant temperature variations detected, which may indicate circulatory issues."
      });
    }
    
    // Pressure insights
    if (maxPressure > 140) {
      insights.push({
        type: "warning",
        title: "High Pressure Readings",
        description: "Pressure exceeded 140 mmHg, which may indicate increased vascular resistance."
      });
    }
    
    // PAD risk insights
    if (maxPadRiskScore > 50) {
      insights.push({
        type: "critical",
        title: "Elevated PAD Risk",
        description: "PAD risk score exceeded 50, indicating moderate to high risk of peripheral artery disease."
      });
    }

    // If we don't have any specific insights but have enough data
    if (insights.length === 0 && readings.length > 5) {
      insights.push({
        type: "info",
        title: "Normal Readings",
        description: "All measurements are within normal ranges. Continue monitoring regularly."
      });
    }

    return {
      averages: { bloodFlow: avgBloodFlow, temperature: avgTemperature, pressure: avgPressure, padRiskScore: avgPadRiskScore },
      minimums: { bloodFlow: minBloodFlow, temperature: minTemperature, pressure: minPressure, padRiskScore: minPadRiskScore },
      maximums: { bloodFlow: maxBloodFlow, temperature: maxTemperature, pressure: maxPressure, padRiskScore: maxPadRiskScore },
      standardDeviations: { bloodFlow: sdBloodFlow, temperature: sdTemperature, pressure: sdPressure, padRiskScore: sdPadRiskScore },
      trends: { bloodFlow: bloodFlowTrend, temperature: temperatureTrend, pressure: pressureTrend, padRiskScore: padRiskScoreTrend },
      insights
    };
  }, [readings, latestReading]);

  // Helper function to calculate standard deviation
  function calculateStandardDeviation(values: number[]): number {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(value => {
      const diff = value - avg;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Advanced analysis of your PAD monitoring data
          </p>
        </div>

        {analytics ? (
          <>
            {/* Risk Score */}
            <div className="grid grid-cols-1 gap-6">
              <PadRiskGauge value={analytics.averages.padRiskScore} />
            </div>

            {/* Insights */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Key Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analytics.insights.map((insight, index) => (
                  <Card key={index} className={`border-l-4 ${
                    insight.type === "critical" 
                      ? "border-l-red-500" 
                      : insight.type === "warning" 
                        ? "border-l-amber-500" 
                        : "border-l-blue-500"
                  }`}>
                    <CardContent className="p-4 flex gap-4 items-start">
                      <div className={`p-2 rounded-full ${
                        insight.type === "critical" 
                          ? "bg-red-100 text-red-500" 
                          : insight.type === "warning" 
                            ? "bg-amber-100 text-amber-500" 
                            : "bg-blue-100 text-blue-500"
                      }`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Statistical Summary */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Statistical Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Activity className="mr-2 h-4 w-4 text-primary" />
                      Blood Flow Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average</span>
                      <span className="font-medium">{analytics.averages.bloodFlow.toFixed(1)} bpm</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Minimum</span>
                      <span className="font-medium">{analytics.minimums.bloodFlow.toFixed(1)} bpm</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Maximum</span>
                      <span className="font-medium">{analytics.maximums.bloodFlow.toFixed(1)} bpm</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Standard Deviation</span>
                      <span className="font-medium">±{analytics.standardDeviations.bloodFlow.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Trend</span>
                      <span className="flex items-center">
                        {analytics.trends.bloodFlow === "up" ? (
                          <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {analytics.trends.bloodFlow === "up" ? "Increasing" : "Decreasing"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Thermometer className="mr-2 h-4 w-4 text-primary" />
                      Temperature Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average</span>
                      <span className="font-medium">{analytics.averages.temperature.toFixed(1)} °C</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Minimum</span>
                      <span className="font-medium">{analytics.minimums.temperature.toFixed(1)} °C</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Maximum</span>
                      <span className="font-medium">{analytics.maximums.temperature.toFixed(1)} °C</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Standard Deviation</span>
                      <span className="font-medium">±{analytics.standardDeviations.temperature.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Trend</span>
                      <span className="flex items-center">
                        {analytics.trends.temperature === "up" ? (
                          <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        {analytics.trends.temperature === "up" ? "Increasing" : "Decreasing"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Charts */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Advanced Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MetricChart
                  title="Blood Flow Distribution"
                  description="Blood flow patterns over time"
                  data={readings}
                  dataKey="bloodFlow"
                  color="#3b82f6"
                  unit="bpm"
                />
                <MetricChart
                  title="PAD Risk Score Correlation"
                  description="Risk score evolution with readings"
                  data={readings}
                  dataKey="padRiskScore"
                  color="#f43f5e"
                  valueFormatter={(value) => value.toFixed(0)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {loading 
                ? "Loading analytics data..." 
                : "No data available for analysis. Please collect more sensor data."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
