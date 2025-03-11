
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSensorData } from '@/contexts/SensorDataContext';
import { MetricChart } from '@/components/MetricChart';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Activity, BarChart3, ThermometerIcon, Waves } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InfoTooltip } from '@/components/InfoTooltip';
import { ExportDataDialog } from '@/components/ExportDataDialog';
import { ConnectDoctorDialog } from '@/components/ConnectDoctorDialog';
import { MetricsGlossary } from '@/components/MetricsGlossary';

const Analytics = () => {
  const { readings, loading, isSimulating, setIsSimulating } = useSensorData();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<'all' | 'day' | 'week' | 'month'>('all');
  
  // Filter readings based on selected time range
  const filteredReadings = React.useMemo(() => {
    if (timeRange === 'all') return readings;
    
    const now = Date.now();
    let cutoff = now;
    
    switch (timeRange) {
      case 'day':
        cutoff = now - 24 * 60 * 60 * 1000; // 24 hours
        break;
      case 'week':
        cutoff = now - 7 * 24 * 60 * 60 * 1000; // 7 days
        break;
      case 'month':
        cutoff = now - 30 * 24 * 60 * 60 * 1000; // 30 days
        break;
    }
    
    return readings.filter(reading => reading.timestamp >= cutoff);
  }, [readings, timeRange]);
  
  // Calculate statistics
  const stats = React.useMemo(() => {
    if (filteredReadings.length === 0) {
      return {
        avgRiskScore: 0,
        maxRiskScore: 0,
        minRiskScore: 0,
        avgBloodFlow: 0,
        avgTemperature: 0,
        avgPressure: 0,
        highRiskCount: 0,
        moderateRiskCount: 0,
        lowRiskCount: 0
      };
    }
    
    const riskScores = filteredReadings.map(r => r.padRiskScore);
    const bloodFlows = filteredReadings.map(r => r.bloodFlow);
    const temperatures = filteredReadings.map(r => r.temperature);
    const pressures = filteredReadings.map(r => r.pressure);
    
    const avgRiskScore = riskScores.reduce((a, b) => a + b, 0) / riskScores.length;
    const avgBloodFlow = bloodFlows.reduce((a, b) => a + b, 0) / bloodFlows.length;
    const avgTemperature = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
    const avgPressure = pressures.reduce((a, b) => a + b, 0) / pressures.length;
    
    return {
      avgRiskScore,
      maxRiskScore: Math.max(...riskScores),
      minRiskScore: Math.min(...riskScores),
      avgBloodFlow,
      avgTemperature,
      avgPressure,
      highRiskCount: riskScores.filter(score => score > 70).length,
      moderateRiskCount: riskScores.filter(score => score > 30 && score <= 70).length,
      lowRiskCount: riskScores.filter(score => score <= 30).length
    };
  }, [filteredReadings]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Analyze your PAD monitoring data and trends
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {readings.length > 0 && (
            <>
              <ExportDataDialog readings={readings} />
              <ConnectDoctorDialog />
              <MetricsGlossary />
            </>
          )}
          
          {readings.length === 0 && (
            <Button
              variant={isSimulating ? "destructive" : "default"}
              className="gap-2"
              onClick={() => setIsSimulating(!isSimulating)}
            >
              {isSimulating ? "Stop Simulation" : "Start Simulation"}
              <Activity className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : readings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Data Available</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              Start the simulation to generate sensor readings and view analytics.
            </p>
            <Button 
              className="mt-6"
              onClick={() => setIsSimulating(true)}
            >
              Start Simulation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
                  <InfoTooltip content="This is your average PAD risk score over the selected time period. Lower scores indicate lower risk of Peripheral Artery Disease." />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgRiskScore.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Min: {stats.minRiskScore} / Max: {stats.maxRiskScore}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Average Blood Flow</CardTitle>
                  <InfoTooltip content="This is your average blood flow reading. Normal blood flow is between 80-100%. Lower values can indicate PAD." />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgBloodFlow.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Healthy range: 80-100%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
                  <InfoTooltip content="This is your average skin temperature. Normal temperature is between 36-37°C. Lower temperatures in limbs can indicate poor circulation." />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgTemperature.toFixed(1)}°C</div>
                <p className="text-xs text-muted-foreground">
                  Healthy range: 36-37°C
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Average Pressure</CardTitle>
                  <InfoTooltip content="This is your average blood pressure reading. Normal range is 80-120 mmHg. High pressure can contribute to PAD risk." />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgPressure.toFixed(0)} mmHg</div>
                <p className="text-xs text-muted-foreground">
                  Healthy range: 80-120 mmHg
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex items-center gap-2">
                  <CardTitle>PAD Risk Distribution</CardTitle>
                  <InfoTooltip content="This shows how many of your readings fall into each risk category. More readings in the low risk category is better." />
                </div>
                <CardDescription className="md:mt-0">
                  Risk score distribution across {filteredReadings.length} readings
                </CardDescription>
                
                <div className="mt-4 md:mt-0">
                  <div className="flex space-x-1">
                    <Button
                      variant={timeRange === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={timeRange === 'day' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('day')}
                    >
                      Day
                    </Button>
                    <Button
                      variant={timeRange === 'week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('week')}
                    >
                      Week
                    </Button>
                    <Button
                      variant={timeRange === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('month')}
                    >
                      Month
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {stats.highRiskCount}
                  </div>
                  <div className="text-sm font-medium mt-1">High Risk Readings</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((stats.highRiskCount / filteredReadings.length) * 100).toFixed(1)}% of total
                  </div>
                  <div className="text-xs mt-2">
                    <InfoTooltip content="Readings with risk score above 70. These suggest significant circulation problems that may indicate PAD. Medical consultation is recommended." />
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.moderateRiskCount}
                  </div>
                  <div className="text-sm font-medium mt-1">Moderate Risk Readings</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((stats.moderateRiskCount / filteredReadings.length) * 100).toFixed(1)}% of total
                  </div>
                  <div className="text-xs mt-2">
                    <InfoTooltip content="Readings with risk score between 30-70. These suggest some circulation issues that should be monitored. Consider preventative measures." />
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {stats.lowRiskCount}
                  </div>
                  <div className="text-sm font-medium mt-1">Low Risk Readings</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((stats.lowRiskCount / filteredReadings.length) * 100).toFixed(1)}% of total
                  </div>
                  <div className="text-xs mt-2">
                    <InfoTooltip content="Readings with risk score below 30. These suggest normal circulation. Continue with healthy lifestyle habits." />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="riskScore" className="space-y-4">
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="riskScore" className="gap-2">
                <Activity className="w-4 h-4" />
                Risk Score
              </TabsTrigger>
              <TabsTrigger value="bloodFlow" className="gap-2">
                <Waves className="w-4 h-4" />
                Blood Flow
              </TabsTrigger>
              <TabsTrigger value="temperature" className="gap-2">
                <ThermometerIcon className="w-4 h-4" />
                Temperature
              </TabsTrigger>
              <TabsTrigger value="pressure" className="gap-2">
                <Activity className="w-4 h-4" />
                Pressure
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="riskScore">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Risk Score Trend</CardTitle>
                    <InfoTooltip content="This chart shows your PAD risk score over time. Lower values indicate better circulation health. Watch for upward trends which may indicate worsening condition." />
                  </div>
                  <CardDescription>
                    Calculated PAD risk scores over time 
                    {timeRange !== 'all' && ` (Past ${timeRange})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <MetricChart 
                      data={filteredReadings} 
                      dataKey="padRiskScore" 
                      color="#ef4444" 
                      unit="" 
                      title="Risk Score"
                      referenceRange={{ min: 0, max: 30, dangerThreshold: 70 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bloodFlow">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Blood Flow Trend</CardTitle>
                    <InfoTooltip content="This chart shows your blood flow readings over time. Higher values indicate better circulation. Normal range is 80-100%." />
                  </div>
                  <CardDescription>
                    PPG sensor readings over time
                    {timeRange !== 'all' && ` (Past ${timeRange})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <MetricChart 
                      data={filteredReadings} 
                      dataKey="bloodFlow" 
                      color="#3b82f6" 
                      unit="%" 
                      title="Blood Flow"
                      referenceRange={{ min: 70, max: 100 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="temperature">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Temperature Trend</CardTitle>
                    <InfoTooltip content="This chart shows your temperature readings over time. Normal body temperature is around 36.5°C. Lower temperatures in limbs can indicate poor circulation." />
                  </div>
                  <CardDescription>
                    Temperature sensor readings over time
                    {timeRange !== 'all' && ` (Past ${timeRange})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <MetricChart 
                      data={filteredReadings} 
                      dataKey="temperature" 
                      color="#ef4444" 
                      unit="°C" 
                      title="Temperature"
                      referenceRange={{ min: 36, max: 37 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pressure">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pressure Trend</CardTitle>
                    <InfoTooltip content="This chart shows your blood pressure readings over time. Normal range is 80-120 mmHg. High pressure can contribute to PAD risk." />
                  </div>
                  <CardDescription>
                    Pressure sensor readings over time
                    {timeRange !== 'all' && ` (Past ${timeRange})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <MetricChart 
                      data={filteredReadings} 
                      dataKey="pressure" 
                      color="#10b981" 
                      unit="mmHg" 
                      title="Pressure"
                      referenceRange={{ min: 80, max: 120 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Readings</CardTitle>
                <InfoTooltip content="This table shows your most recent sensor readings with all measured values. The color of the risk score indicates severity (green=low, yellow=moderate, red=high)." />
              </div>
              <CardDescription>
                Last {Math.min(10, filteredReadings.length)} sensor readings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 text-sm font-medium">
                  <div>Timestamp</div>
                  <div>Blood Flow</div>
                  <div>Temperature</div>
                  <div>Pressure</div>
                  <div>Motion (x,y,z)</div>
                  <div>Risk Score</div>
                </div>
                <div className="divide-y">
                  {filteredReadings.slice(-10).reverse().map((reading, i) => (
                    <div key={i} className="grid grid-cols-6 p-4 text-sm">
                      <div>{format(new Date(reading.timestamp), 'MMM d, HH:mm:ss')}</div>
                      <div>{reading.bloodFlow.toFixed(1)}%</div>
                      <div>{reading.temperature.toFixed(1)}°C</div>
                      <div>{reading.pressure.toFixed(0)} mmHg</div>
                      <div>
                        {reading.motion.x.toFixed(2)}, {reading.motion.y.toFixed(2)}, {reading.motion.z.toFixed(2)}
                      </div>
                      <div 
                        className={
                          reading.padRiskScore > 70 
                            ? 'text-red-500' 
                            : reading.padRiskScore > 30 
                              ? 'text-amber-500' 
                              : 'text-green-500'
                        }
                      >
                        {reading.padRiskScore}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Analytics;
