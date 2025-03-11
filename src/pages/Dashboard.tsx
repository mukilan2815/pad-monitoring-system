
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSensorData } from '@/contexts/SensorDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Activity, AlertCircle, ArrowRight, Clock, ThermometerIcon, Waves } from 'lucide-react';
import { PadRiskGauge } from '@/components/PadRiskGauge';
import { MetricChart } from '@/components/MetricChart';
import { format } from 'date-fns';
import { SensorCard } from '@/components/SensorCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { readings, latestReading, isSimulating, setIsSimulating, loading } = useSensorData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Find readings with high risk scores (>70)
  const highRiskReadings = readings.filter(reading => reading.padRiskScore > 70);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser?.displayName || 'User'}</h1>
          <p className="text-muted-foreground">Here's your PAD monitoring overview</p>
        </div>
        
        <Button 
          variant={isSimulating ? "destructive" : "default"}
          className="gap-2"
          onClick={() => setIsSimulating(!isSimulating)}
        >
          {isSimulating ? (
            <>Stop Simulation <AlertCircle className="w-4 h-4" /></>
          ) : (
            <>Start Simulation <Activity className="w-4 h-4" /></>
          )}
        </Button>
      </div>

      {/* Risk Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 xl:col-span-1 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Current PAD Risk Score</CardTitle>
            <CardDescription>
              Based on latest sensor readings from {latestReading ? format(new Date(latestReading.timestamp), 'MMMM d, h:mm a') : 'N/A'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : latestReading ? (
              <div className="flex flex-col items-center">
                <PadRiskGauge value={latestReading.padRiskScore} />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold">
                    {latestReading.padRiskScore < 30 
                      ? 'Low Risk' 
                      : latestReading.padRiskScore < 70 
                        ? 'Moderate Risk' 
                        : 'High Risk'}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {latestReading.padRiskScore < 30 
                      ? 'Continue monitoring and maintain healthy habits' 
                      : latestReading.padRiskScore < 70 
                        ? 'Pay attention to symptoms and consider a check-up' 
                        : 'Consult with your healthcare provider immediately'}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="mt-4 gap-2"
                    onClick={() => navigate('/monitoring')}
                  >
                    View Detailed Metrics
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No sensor readings available.</p>
                <Button
                  className="mt-4"
                  onClick={() => setIsSimulating(true)}
                >
                  Start Simulation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Metrics */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Current Metrics</CardTitle>
            <CardDescription>Latest sensor readings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : latestReading ? (
              <div className="grid grid-cols-2 gap-4">
                <SensorCard 
                  title="Blood Flow" 
                  value={`${latestReading.bloodFlow.toFixed(1)}%`}
                  description={latestReading.bloodFlow < 70 ? "Below normal" : "Normal range"}
                  icon={<Waves className="text-blue-500" />}
                  status={latestReading.bloodFlow < 70 ? "warning" : "normal"}
                />
                
                <SensorCard 
                  title="Temperature" 
                  value={`${latestReading.temperature.toFixed(1)}°C`}
                  description={
                    latestReading.temperature < 35 ? "Below normal" : 
                    latestReading.temperature > 37.5 ? "Above normal" : 
                    "Normal range"
                  }
                  icon={<ThermometerIcon className="text-red-500" />}
                  status={
                    latestReading.temperature < 35 || latestReading.temperature > 37.5 
                      ? "warning" 
                      : "normal"
                  }
                />
                
                <SensorCard 
                  title="Pressure" 
                  value={`${latestReading.pressure.toFixed(0)} mmHg`}
                  description={
                    latestReading.pressure > 130 ? "Above normal" : 
                    latestReading.pressure < 80 ? "Below normal" : 
                    "Normal range"
                  }
                  icon={<Activity className="text-green-500" />}
                  status={
                    latestReading.pressure > 130 || latestReading.pressure < 80
                      ? "warning" 
                      : "normal"
                  }
                />
                
                <SensorCard 
                  title="Last Update" 
                  value={format(new Date(latestReading.timestamp), 'h:mm:ss a')}
                  description={format(new Date(latestReading.timestamp), 'MMM d, yyyy')}
                  icon={<Clock className="text-purple-500" />}
                  status="normal"
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No sensor readings available.</p>
                <Button
                  className="mt-4"
                  onClick={() => setIsSimulating(true)}
                >
                  Start Simulation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alert Card */}
        <Card className={`shadow-sm ${highRiskReadings.length > 0 ? 'border-red-300 bg-red-50/50 dark:bg-red-900/10' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              {highRiskReadings.length > 0 && <AlertCircle className="text-red-500 w-5 h-5" />}
              Health Alerts
            </CardTitle>
            <CardDescription>Important notifications based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : highRiskReadings.length > 0 ? (
              <div className="space-y-4">
                <div className="rounded-md bg-red-100 dark:bg-red-900/20 p-4 text-red-800 dark:text-red-200">
                  <div className="flex items-start">
                    <AlertCircle className="mt-0.5 mr-2 w-5 h-5" />
                    <div>
                      <h4 className="font-medium">High PAD Risk Detected</h4>
                      <p className="text-sm mt-1">
                        {highRiskReadings.length} high-risk readings in the last {readings.length} measurements.
                        Consider consulting with your healthcare provider.
                      </p>
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="gap-1"
                          onClick={() => navigate('/analytics')}
                        >
                          View Details
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mt-2">
                  <p>
                    Last high-risk reading at {format(new Date(highRiskReadings[highRiskReadings.length - 1].timestamp), 'h:mm a, MMM d')}
                  </p>
                </div>
              </div>
            ) : readings.length > 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 mb-4">
                  <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium">No Alerts Detected</h4>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Your recent measurements show no signs of high PAD risk. Continue monitoring and maintain healthy habits.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No data available for alerts.</p>
                <Button
                  className="mt-4"
                  onClick={() => setIsSimulating(true)}
                >
                  Start Simulation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Blood Flow Trend</CardTitle>
            <CardDescription>PPG sensor readings over time</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : readings.length > 0 ? (
              <div className="h-[300px]">
                <MetricChart 
                  data={readings.slice(-20)} 
                  dataKey="bloodFlow" 
                  color="#3b82f6" 
                  unit="%" 
                  name="Blood Flow"
                  referenceRange={{ min: 70, max: 100 }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blood flow data available.</p>
                <Button
                  className="mt-4"
                  onClick={() => setIsSimulating(true)}
                >
                  Start Simulation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">PAD Risk Score Trend</CardTitle>
            <CardDescription>Calculated risk assessment over time</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : readings.length > 0 ? (
              <div className="h-[300px]">
                <MetricChart 
                  data={readings.slice(-20)} 
                  dataKey="padRiskScore" 
                  color="#ef4444" 
                  unit="" 
                  name="Risk Score"
                  referenceRange={{ min: 0, max: 30, dangerThreshold: 70 }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No risk score data available.</p>
                <Button
                  className="mt-4"
                  onClick={() => setIsSimulating(true)}
                >
                  Start Simulation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
