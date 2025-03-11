"use client";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  BarChart3,
  Heart,
  Stethoscope,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
  Phone,
  Users,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const MotionCard = motion(Card);

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const comparisonRef = useRef(null);
  const innovationRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const comparisonInView = useInView(comparisonRef, {
    once: true,
    amount: 0.3,
  });
  const innovationInView = useInView(innovationRef, {
    once: true,
    amount: 0.3,
  });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.3,
  });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="py-4 px-6 border-b bg-white dark:bg-sidebar shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-lg">PAD Monitor</div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#comparison"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Comparison
            </a>
            <a
              href="#innovation"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Innovation
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </nav>
          <div className="flex gap-4">
            {currentUser ? (
              <Button
                onClick={() => navigate("/dashboard")}
                className="hover:bg-primary/90"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button onClick={() => navigate("/signup")}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-24 px-6 bg-gradient-to-b from-primary/10 to-background overflow-hidden"
        id="hero"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-left"
            >
              <motion.div variants={fadeIn}>
                <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                  Patent-Pending Technology
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
              >
                Smarter PAD Management with{" "}
                <span className="text-primary">AI-Powered</span> Insights
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl text-muted-foreground mb-10"
              >
                Detect and prevent Peripheral Artery Disease complications early
                using smart monitoring and real-time analytics.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="gap-2 transition-all duration-300 hover:scale-105 group"
                  onClick={() =>
                    navigate(currentUser ? "/dashboard" : "/signup")
                  }
                >
                  {currentUser ? "Go to Dashboard" : "Get Started"}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate("/monitoring")}
                >
                  Learn More
                  <BarChart3 className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="mt-8 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">500+</span>{" "}
                  healthcare providers trust PAD Monitor
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                heroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="PAD Monitor Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">
                      Real-time PAD Monitoring
                    </h3>
                    <p className="text-sm opacity-90">
                      AI-powered insights at your fingertips
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 w-full h-full bg-primary/20 rounded-2xl -bottom-6 -right-6"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 px-6 bg-background"
        id="features"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Key Features</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-extrabold mb-4"
            >
              Why Choose PAD Monitor?
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Our comprehensive solution offers everything you need to monitor
              and manage PAD effectively.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Activity className="w-10 h-10 text-primary" />,
                title: "Real-time Monitoring",
                description:
                  "Continuous tracking of vital signs and symptoms with instant alerts for critical changes.",
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-primary" />,
                title: "AI-Driven Prediction",
                description:
                  "Advanced algorithms predict potential complications up to 6 months in advance.",
              },
              {
                icon: <Heart className="w-10 h-10 text-primary" />,
                title: "Smart Compression Socks",
                description:
                  "Integrated sensors track blood flow, temperature, and pressure in real-time.",
              },
              {
                icon: <Stethoscope className="w-10 h-10 text-primary" />,
                title: "Healthcare Integration",
                description:
                  "Seamlessly integrates with existing EHR systems for comprehensive patient care.",
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "Patient Engagement",
                description:
                  "Mobile app with personalized insights and recommendations for better self-management.",
              },
              {
                icon: <Shield className="w-10 h-10 text-primary" />,
                title: "HIPAA Compliant",
                description:
                  "Enterprise-grade security ensures patient data is always protected and private.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeIn} className="group">
                <MotionCard className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 transition-colors group-hover:bg-primary/20">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto group">
                      <span className="text-primary">Learn more</span>
                      <ArrowRight className="ml-2 w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </MotionCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section
        ref={comparisonRef}
        className="py-20 px-6 bg-muted/30"
        id="comparison"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={comparisonInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Comparison</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-extrabold mb-4"
            >
              How We Compare
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              See why PAD Monitor outperforms traditional solutions in every
              aspect.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              comparisonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.7 }}
            className="overflow-x-auto rounded-xl shadow-lg"
          >
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left font-medium rounded-tl-xl">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-left font-medium bg-primary-foreground text-primary">
                    PAD Monitor
                  </th>
                  <th className="px-6 py-4 text-left font-medium rounded-tr-xl">
                    Traditional Solutions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {[
                  [
                    "AI-Driven Prediction",
                    "✅ Predicts 6 months in advance",
                    "❌ No predictive capabilities",
                  ],
                  [
                    "Real-time Monitoring",
                    "✅ Continuous 24/7 tracking",
                    "❌ Periodic check-ups only",
                  ],
                  [
                    "Smart Compression Socks",
                    "✅ Integrated sensors for health tracking",
                    "❌ Standard socks without sensors",
                  ],
                  [
                    "Healthcare Integration",
                    "✅ Automatic EHR sync with all major systems",
                    "❌ Manual data entry required",
                  ],
                  [
                    "Patient Mobile App",
                    "✅ Comprehensive mobile experience",
                    "❌ Limited or no mobile access",
                  ],
                  [
                    "Cost Effectiveness",
                    "✅ Reduces hospital readmissions by 68%",
                    "❌ No impact on readmission rates",
                  ],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }
                  >
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className="px-6 py-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Uniqueness & Innovation Section */}
      <section
        ref={innovationRef}
        className="py-20 px-6 bg-background"
        id="innovation"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={
                innovationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
              }
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="PAD Monitor Innovation"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -z-10 w-full h-full bg-primary/20 rounded-2xl -bottom-6 -left-6"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={innovationInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <Badge className="mb-4">Innovation</Badge>
              </motion.div>
              <motion.h2
                variants={fadeIn}
                className="text-4xl font-extrabold mb-6"
              >
                World's First Patent-Pending PAD Monitoring Solution
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-muted-foreground mb-8"
              >
                Our AI-powered PAD Monitor is the first of its kind to integrate
                smart compression socks with predictive AI analytics, offering
                real-time insights and automated healthcare integration.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                {[
                  [
                    "🏆 Patent-Pending Technology",
                    "Our innovative design and AI-based predictive capabilities are patent-pending.",
                  ],
                  [
                    "🚀 First-of-Its-Kind Solution",
                    "No other PAD monitoring solution offers continuous real-time insights with AI.",
                  ],
                  [
                    "🌍 Global Impact",
                    "Addressing a major global health issue with scalable technology.",
                  ],
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {item[0].split(" ")[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {item[0].split(" ").slice(1).join(" ")}
                      </h3>
                      <p className="text-muted-foreground">{item[1]}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeIn} className="mt-10">
                <Button
                  size="lg"
                  className="gap-2 group"
                  onClick={() => navigate("/technology")}
                >
                  Explore Our Technology
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-20 px-6 bg-muted/30"
        id="testimonials"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Testimonials</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-extrabold mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Hear from healthcare providers and patients who have transformed
              their PAD management.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                quote:
                  "PAD Monitor has revolutionized how we track patient outcomes. The predictive analytics have helped us prevent several critical events.",
                name: "Dr. Sarah Johnson",
                title: "Vascular Surgeon, Mayo Clinic",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "As someone living with PAD for over a decade, this technology has given me peace of mind and significantly improved my quality of life.",
                name: "Michael Rodriguez",
                title: "Patient",
                avatar: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "The integration with our hospital's EHR system was seamless. The data insights have improved our decision-making process.",
                name: "Dr. James Chen",
                title: "Chief Medical Officer, Memorial Hospital",
                avatar: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="italic text-muted-foreground mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        ref={pricingRef}
        className="py-20 px-6 bg-background"
        id="pricing"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={pricingInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Hardware Pricing</Badge>
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-4xl font-extrabold mb-4"
            >
              Advanced PAD Monitoring Hardware
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              One-time purchase for our cutting-edge smart compression socks
              with integrated sensors.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={
                pricingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
              }
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="PAD Monitor Smart Socks"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -z-10 w-full h-full bg-primary/20 rounded-2xl -bottom-6 -left-6"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={pricingInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold">
                    PAD Monitor Smart Socks
                  </h3>
                  <Badge className="bg-primary text-primary-foreground">
                    Patent-Pending
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold">₹6,000</span>
                  <span className="text-muted-foreground line-through">
                    ₹7,500
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-2 text-green-600 border-green-600"
                  >
                    20% OFF
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  One-time purchase includes a pair of smart compression socks
                  with integrated sensors, charging equipment, and free access
                  to the basic monitoring app.
                </p>
              </motion.div>

              <motion.div variants={fadeIn}>
                <h4 className="font-bold text-lg mb-4">What's Included:</h4>
                <ul className="space-y-3 mb-8">
                  {[
                    "2 PPG Sensors for precise blood flow monitoring",
                    "Temperature Sensor for detecting circulation issues",
                    "2 Pressure Sensors for better circulation analysis",
                    "Motion Sensor (IMU) for detecting gait patterns",
                    "ESP32 Microcontroller with AI processing capabilities",
                    "Rechargeable lithium-polymer battery (up to 7 days per charge)",
                    "High-speed Bluetooth 5.0 connectivity",
                    "Premium compression fabric for comfort and durability",
                    "1-year hardware warranty",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="gap-2 group"
                  onClick={() => navigate("/purchase")}
                >
                  Purchase Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => navigate("/contact")}
                >
                  Bulk Orders
                  <Users className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate={pricingInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Component Breakdown</CardTitle>
                  <CardDescription>
                    High-quality components for reliable monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>PPG Sensors (2)</span>
                      <span className="font-medium">₹600</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Temperature Sensor</span>
                      <span className="font-medium">₹200</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Pressure Sensors (2)</span>
                      <span className="font-medium">₹700</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Motion Sensor (IMU)</span>
                      <span className="font-medium">₹450</span>
                    </li>
                    <li className="flex justify-between">
                      <span>ESP32 Microcontroller</span>
                      <span className="font-medium">₹800</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Lithium-polymer Battery</span>
                      <span className="font-medium">₹500</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bluetooth 5.0 Module</span>
                      <span className="font-medium">₹300</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Compression Fabric</span>
                      <span className="font-medium">₹600</span>
                    </li>
                    <li className="flex justify-between">
                      <span>PCB & Assembly</span>
                      <span className="font-medium">₹700</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Wires & Connectors</span>
                      <span className="font-medium">₹150</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Packaging & Accessories</span>
                      <span className="font-medium">₹500</span>
                    </li>
                    <li className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2">
                      <span>Total</span>
                      <span>₹5,500</span>
                    </li>
                    <li className="flex justify-between text-primary font-bold">
                      <span>Special Launch Price</span>
                      <span>₹6,000</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>
                    Advanced sensors for precise monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-medium mb-1">PPG Sensors</h4>
                      <p className="text-sm text-muted-foreground">
                        High-quality optical sensors that measure blood flow
                        with precision, detecting subtle changes in circulation.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">Temperature Sensor</h4>
                      <p className="text-sm text-muted-foreground">
                        Accurate thermal sensor that detects temperature
                        variations as small as 0.1°C for early warning signs.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">Pressure Sensors</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced pressure sensors that monitor compression
                        levels and detect changes in foot pressure distribution.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">Motion Sensor (IMU)</h4>
                      <p className="text-sm text-muted-foreground">
                        High-accuracy 9-axis motion sensor that tracks gait
                        patterns and mobility changes over time.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">
                        ESP32 Microcontroller
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Power-efficient processor with built-in AI capabilities
                        for on-device analysis.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Warranty & Support</CardTitle>
                  <CardDescription>We stand behind our product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-medium mb-1">
                        1-Year Hardware Warranty
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Full coverage for manufacturing defects and sensor
                        malfunctions.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">Extended Warranty</h4>
                      <p className="text-sm text-muted-foreground">
                        Optional 2-year extended warranty available for ₹1,200.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">Technical Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Email and phone support included for all customers.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium mb-1">Replacement Policy</h4>
                      <p className="text-sm text-muted-foreground">
                        Easy replacement process if your device has issues
                        within warranty period.
                      </p>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate("/warranty")}
                  >
                    View Warranty Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-16 p-8 bg-muted rounded-xl max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Bulk Order Discounts</h3>
            <p className="text-muted-foreground mb-6">
              Perfect for hospitals, clinics, and research institutions. Get
              volume discounts when ordering multiple devices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-bold">5-9 Units</h4>
                <p className="text-primary font-medium">10% Off</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-bold">10-24 Units</h4>
                <p className="text-primary font-medium">15% Off</p>
              </div>
              <div className="p-4 rounded-lg bg-white shadow-sm">
                <h4 className="font-bold">25+ Units</h4>
                <p className="text-primary font-medium">20% Off</p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => navigate("/bulk-order")}
              className="gap-2"
            >
              Request Bulk Quote
              <Phone className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Transform PAD Management?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
              Join hundreds of healthcare providers who are already using PAD
              Monitor to improve patient outcomes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/signup")}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 transition-all duration-300 hover:scale-105 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate("/demo")}
              >
                Request Demo
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-lg">PAD Monitor</div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Revolutionizing PAD management with AI-powered insights and
                smart monitoring technology.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="/testimonials"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="/roadmap"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/team"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/press"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/blog"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/documentation"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/help-center"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/api"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="/partners"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} PAD Monitor. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
