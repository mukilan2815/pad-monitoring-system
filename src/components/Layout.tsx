
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSensorData } from "@/contexts/SensorDataContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  Heart, 
  User, 
  BarChart2, 
  Settings, 
  LogOut, 
  Home,
  Menu,
  X
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  active = false,
  onClick 
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Layout: React.FC = () => {
  const { currentUser, logOut } = useAuth();
  const { isSimulating, setIsSimulating } = useSensorData();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-sidebar transition-transform duration-300 ease-in-out transform md:relative",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo/Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2" onClick={closeSidebarOnMobile}>
              <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Heart size={18} className="text-primary-foreground absolute animate-pulse-slow" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-sidebar-foreground">PADguard</span>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <X size={20} />
              </Button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="space-y-1 mb-8">
            <NavItem 
              icon={Home} 
              label="Overview" 
              to="/dashboard" 
              active={location.pathname === "/dashboard"} 
              onClick={closeSidebarOnMobile}
            />
            <NavItem 
              icon={Activity} 
              label="Monitoring" 
              to="/monitoring" 
              active={location.pathname === "/monitoring"} 
              onClick={closeSidebarOnMobile}
            />
            <NavItem 
              icon={BarChart2} 
              label="Analytics" 
              to="/analytics" 
              active={location.pathname === "/analytics"} 
              onClick={closeSidebarOnMobile}
            />
            <NavItem 
              icon={Heart} 
              label="Health Data" 
              to="/health-data" 
              active={location.pathname === "/health-data"} 
              onClick={closeSidebarOnMobile}
            />
          </nav>

          <Separator className="my-4" />

          {/* Secondary Nav */}
          <nav className="space-y-1">
            <NavItem 
              icon={User} 
              label="Profile" 
              to="/profile" 
              active={location.pathname === "/profile"} 
              onClick={closeSidebarOnMobile}
            />
            <NavItem 
              icon={Settings} 
              label="Settings" 
              to="/settings" 
              active={location.pathname === "/settings"} 
              onClick={closeSidebarOnMobile}
            />
          </nav>

          {/* Sensor Simulation */}
          <div className="pt-4 mt-4 border-t border-sidebar-border">
            <div className="px-3 py-2">
              <div className="text-sm font-medium">Sensor Simulation</div>
              <div className="flex items-center mt-2">
                <Button
                  variant={isSimulating ? "destructive" : "default"}
                  size="sm"
                  className="w-full"
                  onClick={() => setIsSimulating(!isSimulating)}
                >
                  {isSimulating ? "Stop Simulation" : "Start Simulation"}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4">
            {currentUser && (
              <>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{currentUser.displayName || "User"}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                    <LogOut size={18} />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 px-4 border-b flex items-center justify-between bg-background/90 backdrop-blur-sm sticky top-0 z-20">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu size={20} />
            </Button>
          )}
          <div className="flex-1" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
