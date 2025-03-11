
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

export function ConnectDoctorDialog() {
  const [doctorEmail, setDoctorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!doctorEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your doctor's email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would connect to a backend API
      // For demo purposes, we'll simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Connection Request Sent",
        description: "Your doctor will receive an invitation to view your health data.",
      });
      
      setDoctorEmail("");
      setMessage("");
      
      // Close the dialog by clicking the close button programmatically
      const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
      if (closeButton) closeButton.click();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Connect with Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share Your Health Data with Your Doctor</DialogTitle>
            <DialogDescription>
              Enter your doctor's email to share your PAD monitoring data
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctorEmail">Doctor's Email</Label>
              <Input
                id="doctorEmail"
                type="email"
                placeholder="doctor@hospital.com"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to your doctor..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
