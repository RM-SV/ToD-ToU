import React, { useState } from 'react';
import {
  Home, Sun, Battery, Clock, TrendingUp, 
  Settings, Bell, ChevronRight, DollarSign,
  BarChart2, Zap, Calendar, AlertCircle,
  User, HelpCircle, LogOut
} from 'lucide-react';

const HomeDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Quick stats for dashboard cards
  const quickStats = {
    currentPower: "3.2 kW",
    solarProduction: "2.1 kW",
    todaysSavings: "₹245",
    currentRate: "₹8/kWh"
  };

  // Priority alerts/notifications
  const notifications = [
    {
      type: "Savings",
      message: "New cost optimization opportunity detected",
      time: "5 min ago",
      priority: "high"
    },
    {
      type: "Weather",
      message: "Peak solar production expected: 11 AM - 3 PM",
      time: "10 min ago",
      priority: "medium"
    }
  ];

  // Dashboard navigation items
  const dashboards = [
    {
      id: 'real-time',
      title: 'Real-Time Monitoring',
      description: 'Track live tariff rates and consumption',
      icon: Clock,
      color: 'blue',
      stats: '₹8/kWh current rate',
      notification: 'Peak period in 30 mins'
    },
    {
      id: 'solar',
      title: 'Solar Management',
      description: 'Monitor and optimize solar production',
      icon: Sun,
      color: 'yellow',
      stats: '2.1 kW generating',
      notification: 'Optimal production now'
    },
    {
      id: 'consumption',
      title: 'Consumption Analytics',
      description: 'Analyze your energy usage patterns',
      icon: BarChart2,
      color: 'indigo',
      stats: '14.3 kWh today',
      notification: '12% below average'
    },
    {
      id: 'cost-benefit',
      title: 'Cost & Benefits',
      description: 'Track savings and optimization',
      icon: DollarSign,
      color: 'green',
      stats: '₹12,450 saved',
      notification: 'New saving opportunity'
    },
    {
      id: 'forecast',
      title: 'Smart Forecast',
      description: 'AI-powered predictions & recommendations',
      icon: TrendingUp,
      color: 'purple',
      stats: '92% accuracy',
      notification: 'Updated 5m ago'
    },
    {
      id: 'schedule',
      title: 'Smart Scheduling',
      description: 'Optimize appliance timing',
      icon: Calendar,
      color: 'rose',
      stats: '3 recommendations',
      notification: 'Action needed'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Welcome Back, John</h1>
              <p className="text-sm opacity-80">Smart Energy Dashboard</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                2
              </span>
            </button>
            <Settings className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 bg-white border-b">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-600">Current Power</div>
                <div className="text-xl font-bold text-blue-600">{quickStats.currentPower}</div>
              </div>
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-600">Solar Output</div>
                <div className="text-xl font-bold text-yellow-600">{quickStats.solarProduction}</div>
              </div>
              <Sun className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Alerts */}
      {notifications.map((alert, index) => (
        <div key={index} className="mx-4 mt-4">
          <div className={`p-3 rounded-lg flex items-center gap-3 ${
            alert.priority === 'high' ? 'bg-red-50' : 'bg-yellow-50'
          }`}>
            <AlertCircle className={`h-5 w-5 ${
              alert.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div className="flex-1">
              <div className="font-medium">{alert.type}</div>
              <div className="text-sm text-gray-600">{alert.message}</div>
            </div>
            <div className="text-xs text-gray-500">{alert.time}</div>
          </div>
        </div>
      ))}

      {/* Dashboard Navigation */}
      <div className="p-4">
        <h2 className="font-semibold mb-4">Your Dashboards</h2>
        <div className="grid gap-4">
          {dashboards.map((dashboard) => (
            <div 
              key={dashboard.id}
              className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-${dashboard.color}-50`}>
                  <dashboard.icon className={`h-6 w-6 text-${dashboard.color}-500`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{dashboard.title}</h3>
                      <p className="text-sm text-gray-600">{dashboard.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm font-medium text-blue-600">
                      {dashboard.stats}
                    </div>
                    <div className="text-xs text-gray-500">
                      {dashboard.notification}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center text-blue-600">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <HelpCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Help</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg transform transition-transform">
          {/* Notification panel content */}
        </div>
      )}
    </div>
  );
};

export default HomeDashboard;
