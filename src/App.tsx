
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SensorDataProvider } from "@/contexts/SensorDataContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Analytics from "./pages/Analytics";
import PatientProfile from "./pages/PatientProfile";
import NotFound from "./pages/NotFound";

// Components
import { PrivateRoute } from "./components/PrivateRoute";
import Layout from "./components/Layout";  // Changed from MainLayout to Layout

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SensorDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<PatientProfile />} />
                <Route path="/health-data" element={<Navigate to="/analytics" />} />
                <Route path="/settings" element={<Navigate to="/profile" />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SensorDataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
