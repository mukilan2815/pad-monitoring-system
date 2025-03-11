
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function MetricsGlossary() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Explain Metrics
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Understanding Your Health Metrics</SheetTitle>
          <SheetDescription>
            Simple explanations of the measurements shown on your dashboard
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">PAD Risk Score</h3>
            <p className="text-sm text-muted-foreground">
              This number (0-100) shows your risk of having Peripheral Artery Disease. Lower numbers are better.
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><span className="text-green-500 font-medium">0-25:</span> Low risk - Your circulation appears normal</li>
              <li><span className="text-yellow-500 font-medium">25-50:</span> Moderate risk - Some signs of reduced circulation</li>
              <li><span className="text-orange-500 font-medium">50-75:</span> High risk - Significant circulation issues detected</li>
              <li><span className="text-red-500 font-medium">75-100:</span> Critical risk - Severe circulation problems detected</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Blood Flow</h3>
            <p className="text-sm text-muted-foreground">
              This measures how well blood is flowing through your lower limbs. Higher percentages mean better circulation.
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><span className="font-medium">Normal range:</span> 80-100%</li>
              <li><span className="font-medium">Warning range:</span> 70-80%</li>
              <li><span className="font-medium">Critical range:</span> Below 70%</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Low blood flow can indicate narrowed or blocked arteries, which is the main symptom of PAD.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Temperature</h3>
            <p className="text-sm text-muted-foreground">
              This shows the skin surface temperature of your lower limbs in degrees Celsius.
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><span className="font-medium">Normal range:</span> 36-37°C</li>
              <li><span className="font-medium">Warning ranges:</span> 35-36°C or 37-38°C</li>
              <li><span className="font-medium">Critical ranges:</span> Below 35°C or above 38°C</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Abnormally low temperatures in your legs or feet can indicate poor circulation due to PAD.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Pressure</h3>
            <p className="text-sm text-muted-foreground">
              This measures the blood pressure in your lower limbs in millimeters of mercury (mmHg).
            </p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><span className="font-medium">Normal range:</span> 80-120 mmHg</li>
              <li><span className="font-medium">Elevated range:</span> 120-140 mmHg</li>
              <li><span className="font-medium">High range:</span> Above 140 mmHg</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Abnormal pressure readings can indicate circulation problems that may be related to PAD.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Motion Data</h3>
            <p className="text-sm text-muted-foreground">
              These X, Y, and Z values show movement detected by the sensor. They help track your activity levels and can detect limping or other changes in walking patterns that might indicate PAD.
            </p>
          </div>
        </div>

        <SheetFooter>
          <p className="text-xs text-muted-foreground">
            This information is provided for educational purposes only and is not medical advice. Always consult with your healthcare provider about your health concerns.
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
