'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEstateStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  Home,
  Users,
  FileText,
  TrendingUp,
  Clock,
  Calendar,
  DollarSign,
  MessageSquare,
  Mail,
  Phone,
  Eye,
  CheckCircle,
  Bell,
  ArrowRight,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export function RecentActivity() {
  const { properties, leads } = useEstateStore();
  
  // Generate recent activities from store data
  const activities = [
    {
      id: 1,
      type: 'property',
      title: 'New property added',
      description: properties[0]?.title || 'Luxury Penthouse in Manhattan',
      time: '2 minutes ago',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      user: {
        name: 'You',
        avatar: 'Y',
      },
    },
    {
      id: 2,
      type: 'lead',
      title: 'High-value lead generated',
      description: leads[0]?.name || 'Sarah Johnson - Budget $1.5M',
      time: '15 minutes ago',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      user: {
        name: 'Website',
        avatar: 'W',
      },
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI valuation completed',
      description: 'Property XYZ valued at $1.8M (95% confidence)',
      time: '1 hour ago',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      user: {
        name: 'AI',
        avatar: 'AI',
      },
    },
    {
      id: 4,
      type: 'document',
      title: 'Sale agreement generated',
      description: 'Automated contract for Manhattan Penthouse',
      time: '3 hours ago',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      user: {
        name: 'You',
        avatar: 'Y',
      },
    },
    {
      id: 5,
      type: 'lead',
      title: 'Lead scoring updated',
      description: '3 leads reclassified as high priority',
      time: '5 hours ago',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      user: {
        name: 'AI',
        avatar: 'AI',
      },
    },
    {
      id: 6,
      type: 'meeting',
      title: 'Property viewing scheduled',
      description: 'Miami Beach Apartment with Michael Rodriguez',
      time: '6 hours ago',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      user: {
        name: 'Michael',
        avatar: 'M',
      },
    },
    {
      id: 7,
      type: 'message',
      title: 'New message received',
      description: 'Emma Thompson asked about Chicago property',
      time: '8 hours ago',
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      user: {
        name: 'Emma',
        avatar: 'E',
      },
    },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Price change alert',
      description: 'Similar properties in Manhattan increased by 5%',
      time: '2 hours ago',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Lead follow-up reminder',
      description: 'Sarah Johnson needs a response',
      time: '1 day ago',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Document expiring',
      description: 'Listing agreement expires in 5 days',
      time: '2 days ago',
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span>Recent Activity</span>
                <Badge variant="secondary">{activities.length}</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-[400px] overflow-y-auto">
            <div className="divide-y">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    variants={itemVariants}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    className="flex items-start space-x-3 p-4 transition-colors"
                  >
                    <div className={`${activity.bgColor} p-2 rounded-md`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className={`text-xs ${
                            activity.user.avatar === 'AI' 
                              ? 'bg-purple-100 text-purple-600' 
                              : activity.user.avatar === 'W'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {activity.user.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    {activity.type === 'ai' && (
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        AI
                      </Badge>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-600" />
              Notifications
              <Badge className="bg-amber-100 text-amber-800">
                {notifications.length} new
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <Badge className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{notification.description}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                toast.info("Viewing all notifications");
              }}>
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Methods */}
      <motion.div variants={itemVariants}>
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Quick Contacts</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="flex flex-col h-auto py-3 hover:bg-blue-50 hover:border-blue-200" onClick={() => {
                toast.info("Opening email client");
              }}>
                <Mail className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs">Email</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-3 hover:bg-green-50 hover:border-green-200" onClick={() => {
                toast.info("Opening phone dialer");
              }}>
                <Phone className="h-5 w-5 text-green-600 mb-1" />
                <span className="text-xs">Call</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-3 hover:bg-purple-50 hover:border-purple-200" onClick={() => {
                toast.info("Opening messaging app");
              }}>
                <MessageSquare className="h-5 w-5 text-purple-600 mb-1" />
                <span className="text-xs">Message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}