'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Brain, 
  Trophy, 
  BarChart3, 
  TrendingUp, 
  Users, 
  UserCircle, 
  Medal 
} from "lucide-react";

const navigationItems = [
  { href: "/predictions", label: "Model Predictions", icon: Brain, badge: "5" },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/analytics", label: "Analytics", icon: TrendingUp, badge: "Beta" },
  { href: "/team", label: "Team", icon: Users },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <aside className="text-white w-80 min-h-full shadow-lg" style={{ backgroundColor: '#164A2F' }}>
      {/* Quick Stats Card */}
      <div className="p-4 border-b border-green-700">
        <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: '#B59E5B' }} data-testid="sidebar-accuracy">78.3%</div>
            <div className="text-sm text-green-200">Prediction Accuracy</div>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span>This Week: <span className="font-semibold" style={{ color: '#B59E5B' }} data-testid="sidebar-weekly-accuracy">82%</span></span>
            <span>Streak: <span className="font-semibold" style={{ color: '#B59E5B' }} data-testid="sidebar-streak">7</span></span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    active 
                      ? "border-l-4" 
                      : "hover:bg-green-800/30"
                  }`}
                  style={active ? {
                    backgroundColor: 'rgba(34, 197, 94, 0.5)',
                    borderLeftColor: '#B59E5B'
                  } : {}}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon style={{ color: '#B59E5B' }} size={20} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      item.badge === "Beta" 
                        ? "text-green-400" 
                        : "font-semibold"
                    }`} 
                    style={item.badge !== "Beta" ? {
                      backgroundColor: '#B59E5B',
                      color: '#164A2F'
                    } : {}}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Performance Badge */}
      <div className="p-4 border-t border-green-700 mt-4">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-2 rounded-full font-semibold" 
               style={{ backgroundColor: '#B59E5B', color: '#164A2F' }} 
               data-testid="sidebar-tier">
            <Medal className="mr-2" size={16} />
            <span>Gold Tier</span>
          </div>
          <div className="text-sm text-green-200 mt-2">
            <span data-testid="sidebar-points">2,450</span> points • <span data-testid="sidebar-next-tier">550</span> to Platinum
          </div>
          <div className="w-full bg-green-800 rounded-full h-2 mt-2">
            <div 
              className="h-2 rounded-full" 
              style={{ backgroundColor: '#B59E5B', width: "75%" }}
              data-testid="sidebar-tier-progress"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="p-4 border-t border-green-700">
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#B59E5B' }}>Recent Activity</h3>
        <div className="space-y-3" data-testid="sidebar-activity-feed">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <div>
              <div className="text-white">Lakers +5.5 prediction won</div>
              <div className="text-xs" style={{ color: '#B59E5B' }}>2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#B59E5B' }} />
            <div>
              <div className="text-white">Moved up to rank #23</div>
              <div className="text-xs" style={{ color: '#B59E5B' }}>4 hours ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            <div>
              <div className="text-white">Warriors ML prediction lost</div>
              <div className="text-xs" style={{ color: '#B59E5B' }}>1 day ago</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
