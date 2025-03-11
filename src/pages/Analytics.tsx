
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSensorData } from '@/contexts/SensorDataContext';
import { MetricChart } from '@/components/MetricChart';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Activity, ArrowDownToLine, BarChart3, ThermometerIcon, Waves } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  
  const handleExportData = () => {
    // In a real application, this would generate and download a CSV file
    toast({
      title: "Data Exported",
      description: "Your sensor data has been exported successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Analyze your PAD monitoring data and trends
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleExportData}
          >
            <ArrowDownToLine className="w-4 h-4" />
            Export Data
          </Button>
          
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
                <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
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
                <CardTitle className="text-sm font-medium">Average Blood Flow</CardTitle>
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
                <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
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
                <CardTitle className="text-sm font-medium">Average Pressure</CardTitle>
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
                <div>
                  <CardTitle>PAD Risk Distribution</CardTitle>
                  <CardDescription>
                    Risk score distribution across {filteredReadings.length} readings
                  </CardDescription>
                </div>
                
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
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.moderateRiskCount}
                  </div>
                  <div className="text-sm font-medium mt-1">Moderate Risk Readings</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((stats.moderateRiskCount / filteredReadings.length) * 100).toFixed(1)}% of total
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
                  <CardTitle>Risk Score Trend</CardTitle>
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
                  <CardTitle>Blood Flow Trend</CardTitle>
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
                  <CardTitle>Temperature Trend</CardTitle>
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
                  <CardTitle>Pressure Trend</CardTitle>
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
              <CardTitle>Detailed Readings</CardTitle>
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
