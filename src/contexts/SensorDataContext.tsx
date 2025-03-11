
import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

// Define the sensor data types
export interface SensorReading {
  id?: string;
  timestamp: number;
  bloodFlow: number;       // PPG sensor - blood flow value
  temperature: number;     // Temperature sensor value in Celsius
  pressure: number;        // Pressure sensor value in mmHg
  motion: {                // IMU sensor data
    x: number;
    y: number;
    z: number;
  };
  padRiskScore: number;    // Calculated PAD risk score (0-100)
}

interface SensorDataContextType {
  readings: SensorReading[];
  latestReading: SensorReading | null;
  addReading: (reading: Omit<SensorReading, "id" | "timestamp">) => Promise<void>;
  simulateReading: () => void;
  isSimulating: boolean;
  setIsSimulating: (value: boolean) => void;
  loading: boolean;
  error: string | null;
}

const SensorDataContext = createContext<SensorDataContextType | undefined>(undefined);

export function useSensorData() {
  const context = useContext(SensorDataContext);
  if (context === undefined) {
    throw new Error("useSensorData must be used within a SensorDataProvider");
  }
  return context;
}

// Helper function to generate random data within a range
const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Function to calculate PAD risk score based on sensor values
const calculatePadRiskScore = (bloodFlow: number, temperature: number, pressure: number) => {
  // This is a simplified algorithm - in a real system this would be more sophisticated
  // Low blood flow, abnormal temperature, and high pressure contribute to higher risk
  const bloodFlowFactor = 100 - bloodFlow; // Invert so lower blood flow = higher risk
  const tempFactor = Math.abs(temperature - 36.5) * 10; // Deviation from normal body temp
  const pressureFactor = pressure > 120 ? (pressure - 120) / 2 : 0; // High pressure risk
  
  let score = (bloodFlowFactor * 0.6) + (tempFactor * 0.2) + (pressureFactor * 0.2);
  score = Math.min(100, Math.max(0, score)); // Clamp between 0-100
  
  return Math.round(score);
};

export const SensorDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [latestReading, setLatestReading] = useState<SensorReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  // Function to add a new reading to Firestore
  const addReading = async (reading: Omit<SensorReading, "id" | "timestamp">) => {
    try {
      const readingsRef = collection(db, "sensorReadings");
      
      // Calculate PAD risk score
      const padRiskScore = calculatePadRiskScore(
        reading.bloodFlow, 
        reading.temperature, 
        reading.pressure
      );
      
      const newReading = {
        ...reading,
        padRiskScore,
        timestamp: Date.now()
      };
      
      await addDoc(readingsRef, {
        ...newReading,
        createdAt: serverTimestamp()
      });
    } catch (err: any) {
      console.error("Error adding reading:", err);
      setError("Failed to add reading");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add sensor reading to database",
      });
    }
  };

  // Function to simulate a new sensor reading
  const simulateReading = () => {
    // Normal ranges for a healthy individual
    const healthyBloodFlow = randomInRange(80, 100);
    const healthyTemp = randomInRange(36, 37);
    const healthyPressure = randomInRange(80, 120);

    // Occasionally simulate PAD symptoms (20% chance)
    const hasPadSymptoms = Math.random() < 0.2;
    
    let bloodFlow = healthyBloodFlow;
    let temperature = healthyTemp;
    let pressure = healthyPressure;
    
    if (hasPadSymptoms) {
      // Reduced blood flow is a key PAD indicator
      bloodFlow = randomInRange(40, 70);
      // Temperature might be lower in affected limbs
      temperature = randomInRange(33, 35);
      // Pressure could be higher or irregular
      pressure = randomInRange(130, 150);
    }

    const reading = {
      bloodFlow,
      temperature,
      pressure,
      motion: {
        x: randomInRange(-1, 1),
        y: randomInRange(-1, 1),
        z: randomInRange(-1, 1)
      },
      padRiskScore: 0 // Will be calculated in addReading
    };

    addReading(reading);
  };

  // Listen for sensor readings from Firestore
  useEffect(() => {
    setLoading(true);
    const readingsRef = collection(db, "sensorReadings");
    const q = query(readingsRef, orderBy("timestamp", "desc"), limit(100));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newReadings: SensorReading[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Omit<SensorReading, "id">;
          newReadings.push({
            id: doc.id,
            ...data,
            timestamp: data.timestamp
          });
        });

        // Sort by timestamp in ascending order for charts
        const sortedReadings = newReadings.sort((a, b) => a.timestamp - b.timestamp);
        setReadings(sortedReadings);
        
        if (sortedReadings.length > 0) {
          setLatestReading(sortedReadings[sortedReadings.length - 1]);
        }
        
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching readings:", err);
        setError("Failed to fetch readings");
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Data Error",
          description: "Failed to fetch sensor readings from database",
        });
      }
    );

    return () => unsubscribe();
  }, [toast]);

  // Set up the simulation interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isSimulating) {
      // Simulate a reading immediately
      simulateReading();
      
      // Then set up interval for every 5 seconds
      intervalId = setInterval(() => {
        simulateReading();
      }, 5000);
      
      toast({
        title: "Simulation Started",
        description: "Generating sensor data every 5 seconds"
      });
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSimulating, toast]);

  return (
    <SensorDataContext.Provider
      value={{
        readings,
        latestReading,
        addReading,
        simulateReading,
        isSimulating,
        setIsSimulating,
        loading,
        error
      }}
    >
      {children}
    </SensorDataContext.Provider>
  );
};
