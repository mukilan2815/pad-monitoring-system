
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useSensorData } from '@/contexts/SensorDataContext';
import { CheckCircle2, Clock, InfoIcon, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MedicalInfo {
  age: string;
  gender: string;
  height: string;
  weight: string;
  conditions: string;
  medications: string;
  allergies: string;
  familyHistory: string;
  lifestyle: string;
}

const PatientProfile = () => {
  const { currentUser } = useAuth();
  const { readings } = useSensorData();
  const { toast } = useToast();
  
  // Personal Information state
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  
  // Medical Information state
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    conditions: '',
    medications: '',
    allergies: '',
    familyHistory: '',
    lifestyle: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleMedicalInfoChange = (field: keyof MedicalInfo, value: string) => {
    setMedicalInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Personal information updated successfully!');
      toast({
        title: "Profile Updated",
        description: "Your personal information has been updated successfully."
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  const handleMedicalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Medical information updated successfully!');
      toast({
        title: "Medical Information Updated",
        description: "Your medical information has been updated successfully."
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Patient Profile</h1>
          <p className="text-muted-foreground">Manage your personal and medical information</p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal" className="gap-2">
            <User className="w-4 h-4" />
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="medical" className="gap-2">
            <InfoIcon className="w-4 h-4" />
            Medical Information
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <Clock className="w-4 h-4" />
            Monitoring History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your account information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalInfoSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input
                        id="emergency"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder="Name: Jane Doe, Phone: +1 (555) 987-6543"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, Anytown, USA"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                        Saving...
                      </>
                    ) : "Save Changes"}
                  </Button>
                </div>
                
                {successMessage && (
                  <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>
                Provide your medical history and current conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMedicalInfoSubmit}>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={medicalInfo.age}
                        onChange={(e) => handleMedicalInfoChange('age', e.target.value)}
                        placeholder="45"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        value={medicalInfo.gender}
                        onChange={(e) => handleMedicalInfoChange('gender', e.target.value)}
                        placeholder="Male/Female/Other"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        value={medicalInfo.height}
                        onChange={(e) => handleMedicalInfoChange('height', e.target.value)}
                        placeholder="175"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      value={medicalInfo.weight}
                      onChange={(e) => handleMedicalInfoChange('weight', e.target.value)}
                      placeholder="70"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="conditions">Existing Medical Conditions</Label>
                    <Textarea
                      id="conditions"
                      value={medicalInfo.conditions}
                      onChange={(e) => handleMedicalInfoChange('conditions', e.target.value)}
                      placeholder="List any diagnosed conditions (e.g., hypertension, diabetes)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={medicalInfo.medications}
                      onChange={(e) => handleMedicalInfoChange('medications', e.target.value)}
                      placeholder="List medications and dosages"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={medicalInfo.allergies}
                      onChange={(e) => handleMedicalInfoChange('allergies', e.target.value)}
                      placeholder="List any allergies to medications or substances"
                      rows={2}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="familyHistory">Family Medical History</Label>
                    <Textarea
                      id="familyHistory"
                      value={medicalInfo.familyHistory}
                      onChange={(e) => handleMedicalInfoChange('familyHistory', e.target.value)}
                      placeholder="Note any relevant family medical history, especially cardiovascular conditions"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lifestyle">Lifestyle Factors</Label>
                    <Textarea
                      id="lifestyle"
                      value={medicalInfo.lifestyle}
                      onChange={(e) => handleMedicalInfoChange('lifestyle', e.target.value)}
                      placeholder="Exercise habits, smoking status, alcohol consumption, etc."
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                        Saving...
                      </>
                    ) : "Save Medical Information"}
                  </Button>
                </div>
                
                {successMessage && (
                  <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring History</CardTitle>
              <CardDescription>
                Summary of your PAD monitoring history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Readings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{readings.length}</div>
                      <p className="text-sm text-muted-foreground">Sensor measurements collected</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Monitoring Since</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-medium">
                        {readings.length > 0 
                          ? new Date(readings[0].timestamp).toLocaleDateString()
                          : 'No data'}
                      </div>
                      <p className="text-sm text-muted-foreground">First reading date</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Risk Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {readings.length > 0 ? (
                        <>
                          <div className={`text-xl font-medium ${
                            readings[readings.length - 1].padRiskScore > 70 
                              ? 'text-red-500' 
                              : readings[readings.length - 1].padRiskScore > 30
                                ? 'text-yellow-500'
                                : 'text-green-500'
                          }`}>
                            {readings[readings.length - 1].padRiskScore > 70 
                              ? 'High Risk' 
                              : readings[readings.length - 1].padRiskScore > 30
                                ? 'Moderate Risk'
                                : 'Low Risk'}
                          </div>
                          <p className="text-sm text-muted-foreground">Based on latest reading</p>
                        </>
                      ) : (
                        <div className="text-muted-foreground">No data available</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-lg border">
                  <div className="p-4 bg-muted/20">
                    <h3 className="font-medium">Recent Readings</h3>
                  </div>
                  
                  {readings.length > 0 ? (
                    <div className="divide-y">
                      {readings.slice(-5).reverse().map((reading, index) => (
                        <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                          <div>
                            <div className="font-medium">
                              {new Date(reading.timestamp).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Blood Flow: {reading.bloodFlow.toFixed(1)}% · 
                              Temperature: {reading.temperature.toFixed(1)}°C · 
                              Pressure: {reading.pressure.toFixed(0)} mmHg
                            </div>
                          </div>
                          <div>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reading.padRiskScore > 70 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                                : reading.padRiskScore > 30
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              Risk Score: {reading.padRiskScore}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No monitoring data available yet. Start the simulation to generate data.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Report Generated",
                  description: "Your monitoring report has been generated and is ready to download."
                });
              }}>
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;
