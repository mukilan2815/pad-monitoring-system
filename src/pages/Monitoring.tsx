import { useEffect } from "react";
// import Layout from "@/components/Layout";
import { SensorCard } from "@/components/SensorCard";
import { MetricChart } from "@/components/MetricChart";
import { PadRiskGauge } from "@/components/PadRiskGauge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSensorData } from "@/contexts/SensorDataContext";
import { InfoTooltip } from "@/components/InfoTooltip";
import { ExportDataDialog } from "@/components/ExportDataDialog";
import { ConnectDoctorDialog } from "@/components/ConnectDoctorDialog";
import { MetricsGlossary } from "@/components/MetricsGlossary";
import {
  Thermometer,
  Activity,
  ArrowUp,
  ArrowDown,
  Play,
  Square,
  Heart,
} from "lucide-react";

const Monitoring = () => {
  const {
    readings,
    latestReading,
    simulateReading,
    isSimulating,
    setIsSimulating,
    loading,
  } = useSensorData();

  useEffect(() => {
    // Start simulation automatically if we have no readings
    if (readings.length === 0 && !isSimulating) {
      setIsSimulating(true);
    }
  }, [readings.length, isSimulating, setIsSimulating]);

  // Function to get sensor status
  const getSensorStatus = (
    value: number,
    type: "bloodFlow" | "temperature" | "pressure"
  ) => {
    if (type === "bloodFlow") {
      if (value < 50) return "critical";
      if (value < 70) return "warning";
      return "normal";
    } else if (type === "temperature") {
      if (value < 34) return "critical";
      if (value < 35.5 || value > 37.5) return "warning";
      return "normal";
    } else {
      // pressure
      if (value > 140) return "critical";
      if (value > 120) return "warning";
      return "normal";
    }
  };

  // Function to get sensor status text
  const getStatusText = (
    value: number,
    type: "bloodFlow" | "temperature" | "pressure"
  ) => {
    if (type === "bloodFlow") {
      if (value < 50) return "Critical";
      if (value < 70) return "Warning";
      return "Normal";
    } else if (type === "temperature") {
      if (value < 34) return "Critical";
      if (value < 35.5) return "Low";
      if (value > 37.5) return "High";
      return "Normal";
    } else {
      // pressure
      if (value > 140) return "High";
      if (value > 120) return "Elevated";
      return "Normal";
    }
  };

  // Function to get trend direction
  const getTrend = (current: number, previous: number | undefined) => {
    if (!previous) return "stable";
    const diff = current - previous;
    if (Math.abs(diff) < 2) return "stable";
    return diff > 0 ? "up" : "down";
  };

  // Get the previous reading if available
  const previousReading =
    readings.length > 1 ? readings[readings.length - 2] : undefined;

  // Toggle simulation
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Live Monitoring
            </h1>
            <p className="text-muted-foreground">
              Real-time sensor data from your PAD monitoring device
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={toggleSimulation}
              variant={isSimulating ? "destructive" : "default"}
              className="shadow-sm transition-all"
            >
              {isSimulating ? (
                <>
                  <Square className="mr-2 h-4 w-4" /> Stop Simulation
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Start Simulation
                </>
              )}
            </Button>
            <MetricsGlossary />
            {readings.length > 0 && (
              <>
                <ExportDataDialog readings={readings} />
                <ConnectDoctorDialog />
              </>
            )}
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="charts">Time Series</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {latestReading ? (
              <>
                {/* Risk Assessment */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">
                        PAD Risk Assessment
                      </h3>
                      <InfoTooltip content="This gauge shows your current risk level for Peripheral Artery Disease. Lower scores are better. The score is calculated from your blood flow, temperature, and pressure readings." />
                    </div>
                    <PadRiskGauge value={latestReading.padRiskScore} />
                  </div>
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">Heart Health</h3>
                      <InfoTooltip content="This is a simplified assessment of your heart health based on your PAD risk score. PAD is often linked to other cardiovascular conditions." />
                    </div>
                    <SensorCard
                      title="Heart Health"
                      value={
                        latestReading.padRiskScore < 25
                          ? "Healthy"
                          : latestReading.padRiskScore < 50
                          ? "Monitor"
                          : latestReading.padRiskScore < 75
                          ? "At Risk"
                          : "Severe Risk"
                      }
                      icon={<Heart />}
                      status={
                        latestReading.padRiskScore < 25
                          ? "normal"
                          : latestReading.padRiskScore < 50
                          ? "normal"
                          : latestReading.padRiskScore < 75
                          ? "warning"
                          : "critical"
                      }
                      statusText={
                        latestReading.padRiskScore < 50
                          ? "Maintain healthy habits"
                          : "Consult healthcare provider"
                      }
                      className="h-full"
                    />
                  </div>
                </div>

                {/* Sensor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-medium">Blood Flow</h3>
                      <InfoTooltip content="This measures how well blood is flowing through your lower limbs. Normal range is 80-100%. Low blood flow can indicate PAD." />
                    </div>
                    <SensorCard
                      title="Blood Flow"
                      value={latestReading.bloodFlow.toFixed(1)}
                      unit="bpm"
                      icon={<Activity />}
                      trend={getTrend(
                        latestReading.bloodFlow,
                        previousReading?.bloodFlow
                      )}
                      description="Peripheral blood flow velocity"
                      status={getSensorStatus(
                        latestReading.bloodFlow,
                        "bloodFlow"
                      )}
                      statusText={getStatusText(
                        latestReading.bloodFlow,
                        "bloodFlow"
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-medium">Temperature</h3>
                      <InfoTooltip content="Skin surface temperature in your lower limbs. Normal range is 36-37°C. Lower temperatures can indicate reduced blood flow due to PAD." />
                    </div>
                    <SensorCard
                      title="Temperature"
                      value={latestReading.temperature.toFixed(1)}
                      unit="°C"
                      icon={<Thermometer />}
                      trend={getTrend(
                        latestReading.temperature,
                        previousReading?.temperature
                      )}
                      description="Skin surface temperature"
                      status={getSensorStatus(
                        latestReading.temperature,
                        "temperature"
                      )}
                      statusText={getStatusText(
                        latestReading.temperature,
                        "temperature"
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-medium">Pressure</h3>
                      <InfoTooltip content="Blood pressure in your lower limbs. Normal range is 80-120 mmHg. High pressure can contribute to PAD risk." />
                    </div>
                    <SensorCard
                      title="Pressure"
                      value={latestReading.pressure.toFixed(0)}
                      unit="mmHg"
                      icon={
                        latestReading.pressure > 120 ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      }
                      trend={getTrend(
                        latestReading.pressure,
                        previousReading?.pressure
                      )}
                      description="Lower limb pressure"
                      status={getSensorStatus(
                        latestReading.pressure,
                        "pressure"
                      )}
                      statusText={getStatusText(
                        latestReading.pressure,
                        "pressure"
                      )}
                    />
                  </div>
                </div>

                {/* Motion Data */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">Motion Data</h3>
                    <InfoTooltip content="These values show movement in different directions. They help track your activity and can detect abnormal walking patterns that might indicate PAD." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SensorCard
                      title="Motion X-Axis"
                      value={latestReading.motion.x.toFixed(2)}
                      unit="g"
                      description="Lateral movement"
                    />
                    <SensorCard
                      title="Motion Y-Axis"
                      value={latestReading.motion.y.toFixed(2)}
                      unit="g"
                      description="Forward/backward movement"
                    />
                    <SensorCard
                      title="Motion Z-Axis"
                      value={latestReading.motion.z.toFixed(2)}
                      unit="g"
                      description="Vertical movement"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {loading
                    ? "Loading sensor data..."
                    : "No sensor data available. Start the simulation to generate data."}
                </p>
              </div>
            )}
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            {readings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">
                        Blood Flow Over Time
                      </h3>
                      <InfoTooltip content="This chart shows your blood flow readings over time. Higher values indicate better circulation. Watch for consistently low readings or downward trends." />
                    </div>
                    <MetricChart
                      title="Blood Flow Over Time"
                      description="Peripheral blood flow measurements"
                      data={readings}
                      dataKey="bloodFlow"
                      color="#3b82f6"
                      unit="bpm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">
                        PAD Risk Score Trend
                      </h3>
                      <InfoTooltip content="This chart shows your PAD risk score over time. Watch for upward trends, which may indicate worsening condition." />
                    </div>
                    <MetricChart
                      title="PAD Risk Score Trend"
                      description="Calculated risk assessment"
                      data={readings}
                      dataKey="padRiskScore"
                      color="#f43f5e"
                      valueFormatter={(value) => value.toFixed(0)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">
                        Temperature Variation
                      </h3>
                      <InfoTooltip content="This chart shows your skin temperature over time. Normal body temperature is around 36.5°C. Consistently low temperatures in your limbs can indicate poor circulation." />
                    </div>
                    <MetricChart
                      title="Temperature Variation"
                      description="Skin surface temperature"
                      data={readings}
                      dataKey="temperature"
                      color="#10b981"
                      unit="°C"
                      valueFormatter={(value) => value.toFixed(1)}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">Pressure Readings</h3>
                      <InfoTooltip content="This chart shows your blood pressure readings over time. Normal range is 80-120 mmHg. High pressure can contribute to PAD." />
                    </div>
                    <MetricChart
                      title="Pressure Readings"
                      description="Lower limb pressure measurements"
                      data={readings}
                      dataKey="pressure"
                      color="#8b5cf6"
                      unit="mmHg"
                      valueFormatter={(value) => value.toFixed(0)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {loading
                    ? "Loading chart data..."
                    : "No data available for charts. Start the simulation to generate data."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default Monitoring;
