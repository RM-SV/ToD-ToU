import React, { useState } from 'react';
import { 
  Calendar, Clock, Battery, Zap, AlertCircle, Home, 
  Settings, BarChart, Bell, MoveVertical, Sun, 
  Cloud, ChevronRight, Volume2, ChevronDown
} from 'lucide-react';

const MobileSmartScheduler = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showTariffs, setShowTariffs] = useState(false);

  const tariffPeriods = [
    { time: "00:00-06:00", rate: "₹4/kWh", label: "Super Off-Peak" },
    { time: "06:00-12:00", rate: "₹8/kWh", label: "Off-Peak" },
    { time: "12:00-18:00", rate: "₹12/kWh", label: "Peak" },
    { time: "18:00-24:00", rate: "₹10/kWh", label: "Mid-Peak" }
  ];

  // Get current tariff
  const getCurrentTariff = () => {
    const hour = new Date().getHours();
    return tariffPeriods.find(period => {
      const [start, end] = period.time.split('-').map(time => parseInt(time.split(':')[0]));
      return hour >= start && hour < end;
    });
  };

  const currentTariff = getCurrentTariff();

  // Rest of the existing data...
  const schedules = [
    {
      id: 1,
      appliance: "Washing Machine",
      nextRun: "Today, 2:00 AM",
      energyUsage: "1.2kWh/cycle",
      savings: "₹45",
      priority: "High",
      status: "Scheduled"
    },
    {
      id: 2,
      appliance: "EV Charger",
      nextRun: "Today, 1:00 AM",
      energyUsage: "7.4kWh/charge",
      savings: "₹120",
      priority: "Medium",
      status: "Running"
    }
  ];

  const weatherForecast = {
    today: "Sunny",
    solarEfficiency: "92%",
    recommendation: "Optimal charging time: 10 AM - 2 PM"
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Top Status Bar */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Smart Scheduler</h1>
          <div className="flex gap-3">
            <Bell className="h-5 w-5" />
            <Settings className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Current Tariff Display */}
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm opacity-80">Current Rate</div>
            <div className="text-2xl font-bold">{currentTariff?.rate}</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Period</div>
            <div className="font-semibold">{currentTariff?.label}</div>
          </div>
        </div>
        
        {/* Tariff Period Expander */}
        <button 
          onClick={() => setShowTariffs(!showTariffs)}
          className="flex items-center justify-between w-full text-sm bg-blue-600 rounded p-2"
        >
          <span>View All Tariff Periods</span>
          <ChevronDown className={`h-4 w-4 transform transition-transform ${showTariffs ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Tariff Periods */}
      {showTariffs && (
        <div className="bg-white p-4 shadow-inner">
          <div className="grid gap-2">
            {tariffPeriods.map((period, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  period.label === currentTariff?.label 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-blue-800">{period.label}</div>
                    <div className="text-sm text-gray-600">{period.time}</div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{period.rate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-sm text-gray-600">Today's Savings</div>
            <div className="text-xl font-bold text-blue-600">₹165</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-sm text-gray-600">Energy Used</div>
            <div className="text-xl font-bold text-blue-600">8.6 kWh</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-sm text-gray-600">Efficiency</div>
            <div className="text-xl font-bold text-blue-600">94%</div>
          </div>
        </div>
      </div>

      {/* Solar Optimization Panel */}
      <div className="bg-blue-50 p-4 mx-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <h2 className="font-semibold">Solar Status</h2>
          </div>
          <span className="text-green-600 font-semibold">{weatherForecast.solarEfficiency}</span>
        </div>
        <p className="text-sm text-gray-600">{weatherForecast.recommendation}</p>
      </div>

      {/* Active Schedules */}
      <div className="p-4">
        <h2 className="font-semibold mb-3 text-gray-800">Active Schedules</h2>
        <div className="space-y-3">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-600">{schedule.appliance}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  schedule.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {schedule.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{schedule.nextRun}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gray-400" />
                  <span>{schedule.energyUsage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-gray-400" />
                  <span>Savings: {schedule.savings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MoveVertical className="h-4 w-4 text-gray-400" />
                  <span>Priority: {schedule.priority}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    Modify
                  </button>
                  <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    Skip Once
                  </button>
                </div>
                <Volume2 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Tips */}
      <div className="mx-4 mb-4 bg-blue-50 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Optimization Tip</h4>
            <p className="text-sm text-gray-600">
              Your washing machine is scheduled during peak hours. Moving it to 2 AM could save you ₹45 per cycle.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button className={`p-2 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Home className="h-6 w-6" />
        </button>
        <button className={`p-2 ${activeTab === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Calendar className="h-6 w-6" />
        </button>
        <button className={`p-2 ${activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-400'}`}>
          <BarChart className="h-6 w-6" />
        </button>
        <button className={`p-2 ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Settings className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MobileSmartScheduler;
