
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Activity, BarChart2, ChevronRight } from "lucide-react";

const LandingPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to monitoring page
    if (currentUser) {
      navigate("/monitoring");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 py-28 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="animate-float">
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 md:h-10 md:w-10 text-primary animate-pulse-slow" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            Early Detection and Precision<br />Management for <span className="text-primary">PAD</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-slide-in">
            Advanced monitoring system for Peripheral Artery Disease with real-time analytics and early detection capabilities.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-slide-in">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Comprehensive PAD Monitoring
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our system provides advanced monitoring capabilities to detect PAD symptoms early and manage them effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glassmorphism border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
                  <p className="text-muted-foreground">
                    Continuous monitoring of blood flow, temperature, and pressure using advanced sensors.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <BarChart2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground">
                    Advanced algorithms analyze data patterns to predict PAD progression 6 months earlier than traditional methods.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
                  <p className="text-muted-foreground">
                    Personalized risk assessments and recommendations based on your unique vascular health profile.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 text-center">
              <p className="text-4xl font-bold text-primary">236M+</p>
              <p className="mt-2 text-muted-foreground">People affected by PAD worldwide</p>
            </div>
            <div className="flex flex-col items-center p-6 text-center">
              <p className="text-4xl font-bold text-primary">75%</p>
              <p className="mt-2 text-muted-foreground">Of cases remain undiagnosed</p>
            </div>
            <div className="flex flex-col items-center p-6 text-center">
              <p className="text-4xl font-bold text-primary">3x</p>
              <p className="mt-2 text-muted-foreground">Higher amputation risk with late detection</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to start monitoring your vascular health?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Join thousands of users who are taking control of their PAD management with our advanced monitoring system.
          </p>
          <Button size="lg" className="mt-8" onClick={() => navigate("/signup")}>
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-5 w-5 text-primary mr-2" />
            <span className="font-semibold">PADguard</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PADguard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
