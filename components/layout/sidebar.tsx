'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEstateStore } from '@/lib/store';
import {
  Building2,
  LayoutDashboard,
  Home,
  Users,
  TrendingUp,
  FileText,
  Settings,
  Calculator,
  Target,
  BarChart3,
  UserPlus,
  HelpCircle,
  Crown,
  MessageCircle,
  Sparkles,
  Globe,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    view: 'dashboard' as const,
  },
  {
    name: 'AI Valuation',
    icon: Calculator,
    view: 'valuation' as const,
    badge: 'AI',
  },
  {
    name: 'Properties',
    icon: Home,
    view: 'properties' as const,
  },
  {
    name: 'Leads & CRM',
    icon: Users,
    view: 'leads' as const,
  },
  {
    name: 'Matchmaking',
    icon: Target,
    view: 'matchmaking' as const,
    badge: 'AI',
  },
  {
    name: 'Market Trends',
    icon: TrendingUp,
    view: 'trends' as const,
  },
  {
    name: 'Documents',
    icon: FileText,
    view: 'documents' as const,
  },
  {
    name: 'AI Campaigns',
    icon: Sparkles,
    view: 'campaigns' as const,
    badge: 'NEW',
  },
  {
    name: 'Auto Paperwork',
    icon: Globe,
    view: 'paperwork' as const,
    badge: 'AI',
  },
  {
    name: 'Team',
    icon: UserPlus,
    view: 'team' as const,
  },
  {
    name: 'Settings',
    icon: Settings,
    view: 'settings' as const,
  },
  {
    name: 'Help Center',
    icon: HelpCircle,
    view: 'help' as const,
  },
];

export function Sidebar({ className, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const { currentView, setCurrentView, user } = useEstateStore();

  const handleNavigation = (view: typeof currentView) => {
    setCurrentView(view);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div className={cn(
      "flex h-full w-[300px] flex-col border-r bg-card",
      className,
      // Mobile overlay styling
      isMobileOpen && "fixed inset-y-0 left-0 z-50 lg:relative"
    )}>
      {/* Sidebar header */}
      <div className="flex h-16 items-center border-b px-6">
        <Building2 className="h-8 w-8 text-black" />
        <span className="ml-2 font-bold text-xl text-black">
          Quinex
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start space-x-2",
                isActive && "bg-gray-100 text-black hover:bg-gray-100"
              )}
              onClick={() => handleNavigation(item.view)}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs bg-black text-white">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* AI Assistant Toggle */}
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>AI Assistant</span>
          <Badge variant="secondary" className="ml-auto text-xs bg-purple-100 text-purple-800">
            24/7
          </Badge>
        </Button>
      </div>

      {/* Upgrade prompt */}
      {user?.plan === 'free' && (
        <div className="m-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="h-5 w-5 text-black" />
            <span className="font-semibold text-sm text-black">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Unlock unlimited properties, advanced AI features, and team collaboration
          </p>
          <Button size="sm" className="w-full bg-black hover:bg-gray-800 text-white">
            Upgrade Now
          </Button>
        </div>
      )}
    </div>
  );
}