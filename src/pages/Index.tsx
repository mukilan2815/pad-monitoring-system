
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3, Heart, Stethoscope } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="py-4 px-6 border-b bg-white dark:bg-sidebar">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-lg">PAD Monitor</div>
          </div>
          <div className="flex gap-2">
            {currentUser ? (
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-grid">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Early Detection & Precision Management for PAD
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Advanced monitoring for Peripheral Artery Disease using smart sensors
            and AI analytics to detect issues before they become critical.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={() => navigate(currentUser ? '/dashboard' : '/signup')}>
              {currentUser ? 'Go to Dashboard' : 'Get Started'}
              <Activity className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate('/monitoring')}>
              See How It Works
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Our System Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Stethoscope className="w-10 h-10 text-primary" />,
                title: "Smart Compression Socks",
                description: "Equipped with PPG, temperature, pressure, and motion sensors to monitor vascular health in real-time."
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-primary" />,
                title: "AI-Powered Analytics",
                description: "Our algorithms analyze blood flow patterns and vascular metrics to predict PAD progression up to 6 months earlier."
              },
              {
                icon: <Heart className="w-10 h-10 text-primary" />,
                title: "Healthcare Integration",
                description: "Seamlessly connects with EHRs and provides clinicians with actionable insights and recommendations."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg border sensor-card">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Early Detection Matters</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            PAD affects millions worldwide but is frequently underdiagnosed until complications arise.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                stat: "236M+",
                title: "Global Prevalence",
                description: "People worldwide living with PAD, with higher rates in those aged 60+"
              },
              {
                stat: "75%",
                title: "Underdiagnosis",
                description: "Of PAD cases are not identified early, increasing amputation risks threefold"
              },
              {
                stat: "60%+",
                title: "Quality of Life",
                description: "Of PAD patients experience mobility issues due to delayed detection"
              },
            ].map((item, index) => (
              <div key={index} className="p-6 border rounded-lg bg-muted/20">
                <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of PAD Management?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join our network of healthcare providers and patients using advanced monitoring to prevent complications.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            onClick={() => navigate(currentUser ? '/dashboard' : '/signup')}
          >
            {currentUser ? 'Access Your Dashboard' : 'Sign Up Now'}
            <Activity className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="font-bold">PAD Monitor</div>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PAD Monitor. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
