
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Activity, BarChart3, Home, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSensorData } from '@/contexts/SensorDataContext';
import { cn } from '@/lib/utils';

const MainLayout: React.FC = () => {
  const { currentUser, logOut } = useAuth();
  const { isSimulating, setIsSimulating } = useSensorData();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/monitoring', label: 'Real-Time Monitor', icon: Activity },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-4 bg-sidebar border-r border-sidebar-border">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="font-bold text-lg">PAD Monitor</div>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-sidebar-border space-y-4">
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

          <div className="px-3 py-2 flex items-center">
            <div className="flex-1">
              <div className="text-sm font-medium">{currentUser?.displayName || 'User'}</div>
              <div className="text-xs text-sidebar-foreground/60">{currentUser?.email}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 md:hidden flex items-center justify-between p-4 bg-background z-10 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="font-bold">PAD Monitor</div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around p-2 bg-background z-10 border-t">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-md",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 md:p-8 p-4 pt-20 md:pt-4 pb-20 md:pb-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
